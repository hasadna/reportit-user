import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ScriptRunnerService, ContentService } from 'hatool';
import { StrapiService } from './strapi.service';
import { FileUploader } from 'hatool';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent implements OnInit, AfterViewInit {
  title = 'hatool';
  helpVisible = false;
  moreInfoVisible = false;
  started = false;
  created = false;

  @ViewChild('uploadFileText') uploadFileText: ElementRef;
  @ViewChild('uploadedFileText') uploadedFileText: ElementRef;
  @ViewChild('notUploadedFileText') notUploadedFileText: ElementRef;
  @ViewChild('inputPlaceholder') inputPlaceholder: ElementRef;

  constructor(private runner: ScriptRunnerService,
              private content: ContentService,
              private strapi: StrapiService) {}

  prepareToSave(record) {
    // filter records fields, to save those that do not start with '_'
    const result = {};
    for (const [key, value] of Object.entries(record)) {
      if (key[0] !== '_') {
        result[key] = value;
      }
    }
    return result;
  }

  ngAfterViewInit() {
    this.content.M.uploadFileText = this.uploadFileText.nativeElement.innerHTML;
    this.content.M.uploadedFileText = this.uploadedFileText.nativeElement.innerHTML;
    this.content.M.notUploadedFileText = this.notUploadedFileText.nativeElement.innerHTML;
    this.content.M.inputPlaceholder = this.inputPlaceholder.nativeElement.innerHTML;
  }

  ngOnInit() {
    this.content.M.sendButtonText = '';

    // TODO for Noam:
    // - Done: Fix the isWorkingHours function
    // - Done Call the createUser(context, record) at some point in the script
    //   Record the result of this command in the 'agent_link' field
    // - Done Call updateUser(record) at selected points in the code.
    // - Go over the original flow and make sure all fields were migrated correctly to the script
    // - Done For uploading files call 'upload(key, uploader)' - it will return the link to the uploaded file
  }

  start() {
    if (this.started) {
      return;
    }
    this.started = true;
    this.created = false;
    this.runner.run(
      'https://raw.githubusercontent.com/hasadna/reportit-scripts/master/src/user/script.json',
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
            return (
                (currentHour > dayStartHour || (currentHour === dayStartHour && currentMinute >= dayStartMinute)) &&
                (currentHour < dayEndtHour || (currentHour === dayEndtHour && currentMinute <= dayEndMinute))
            );
          }
          return false;
        },
        createUser: async (context, record) => {
          const recordToSave = this.prepareToSave(record);
          const vid = await this.strapi.createReport(recordToSave);
          context.vid = vid;
          this.created = true;
          return `https://hasadna.github.io/reportit-agent/?vid=${vid}`;
        },
        uploader: async (key, uploader: FileUploader) => {
          uploader.active = true;
          const uploaded = await this.strapi.uploadFile(
            uploader.selectedFile, this.strapi.report_id + '/' + key,
              (progress) => { uploader.progress = progress; },
              (success) => { uploader.success = success; }
          );
          return uploaded;
        },
        addTextToField: async (record) => {
          return `${record.event_description} \n \n מידע נוסף:\n ${record._add_more_data}`;
        },
        offenderIsRealEstateCompany: async (record) => {
          record.offender_organization_category = 'חברת תיווך';
        }
      },
      (key, value, record) => {
        if (this.created) {
          const recordToSave = this.prepareToSave(record);
          return this.strapi.updateReport(recordToSave)
            .subscribe(() => { console.log('UPDATED!'); });
        }
      }
    ).subscribe(() => { console.log('done!'); });
  }

}
