import { Component, OnInit } from '@angular/core';
import { ScriptRunnerService, ContentService } from 'hatool';
import { HubspotService } from './hubspot.service';
import { FileUploader } from 'hatool';
import { async } from '@angular/core/testing';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent implements OnInit {
  title = 'hatool';
  helpVisible = false;

  constructor(private runner: ScriptRunnerService,
              private content: ContentService,
              private hubspot: HubspotService) {}

  ngOnInit() {
    this.content.sendButtonText = '';
    this.content.uploadFileText = 'לחצ/י לבחירת קובץ';
    this.content.uploadedFileText = 'קובץ הועלה בהצלחה';
    this.content.notUploadedFileText = 'תקלה בהעלאת קובץ';
    this.content.inputPlaceholder = 'הקלידו הודעה...';

    // TODO for Noam:
    // - Done: Fix the isWorkingHours function
    // - Done Call the createUser(context, record) at some point in the script
    //   Record the result of this command in the 'agent_link' field
    // - Done Call updateUser(record) at selected points in the code.
    // - Go over the original flow and make sure all fields were migrated correctly to the script
    // - Done For uploading files call 'upload(key, uploader)' - it will return the link to the uploaded file


    const recordKeysToSave = (record) => {
      // filter records fields, to save those that do not start with '_'
      const result = {};
      for (const key in record) {
        if (key.match(/^[^_]/)) {
          result[key] = record[key];
          }
        }
        return result;
      };

    this.runner.run(
      'assets/script.json',
      0,
      {
        isWorkingTime: () => {
          // Check if current time is a working time or not
          const date = new Date();
          const dayOfTheWeek = date.getDay();

          const currentMinute = date.getMinutes();
          const currentHour = date.getHours();

          const workTimes = {                      // Working days and hours
            0: {'start': '09:00',         // Sunday
                'end': '16:00'},
            1: {'start': '09:00',        // Monday
                'end': '16:00'},
            2: {'start': '09:00',       // Tuesday
                'end': '16:00'},
            3: {'start': '09:00',       // Wednesday
                'end': '16:00'},
            4: {'start': '09:00',      // Thursday
                'end': '16:00'}
          };
          if (dayOfTheWeek in workTimes) {
            const [dayStartHour, dayStartMinute] = workTimes[dayOfTheWeek]['start'].split(':');
            const [dayEndtHour, dayEndMinute] = workTimes[dayOfTheWeek]['end'].split(':');
            console.log(currentMinute <= dayEndMinute);
            if (
                (currentHour > dayStartHour || (currentHour === dayStartHour && currentMinute >= dayStartMinute)) &&
                (currentHour < dayEndtHour || (currentHour === dayEndtHour && currentMinute <= dayEndMinute))
              ) {
                return 'true';
              } else {
                return 'false';
              }
            }
        },
        createUser: async (context, record) => {
          const recordToSave = recordKeysToSave(record);
          const vid = await this.hubspot.createUser(recordToSave);
          context.vid = vid;
          return `https://hasadna.github.io/reportit-agent/?vid=${vid}`;
        },
        saveUser: async (record) => {
          const recordToSave = recordKeysToSave(record);
          await this.hubspot.updateUser(recordToSave);
        },
        uploader: async (key, uploader: FileUploader) => {
          uploader.active = true;
          const uploaded = await this.hubspot.uploadFile(
            uploader.selectedFile, this.hubspot.vid + '/' + key,
              (progress) => { uploader.progress = progress; },
              (success) => { uploader.success = success; }
          );
          return uploaded;
        },
        addTextToField: async (record) => {
          return `${record.event_description} \n \n מידע נוסף:\n ${record._add_more_data}`;
        }
      },
      (key, value) => {}
    ).subscribe(() => { console.log('done!'); });
  }

}
