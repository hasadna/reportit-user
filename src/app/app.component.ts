import { Component, OnInit } from '@angular/core';
import { ScriptRunnerService, ContentService } from 'hatool';
import { HubspotService } from './hubspot.service';
import { FileUploader } from 'hatool';
import { async } from '@angular/core/testing';

const offenders =
[
      {value: 0,
      display: 'משטרה',
      displayValue: 'משטרה',
      complaints: {
            question: 'מהו סוג האירוע עליו תרצו לדווח?',
            options:
              [
                {value: 'התנהגות או התבטאות גזענית מצד שוטר/ת',
                  display: 'התנהגות או התבטאות גזענית מצד שוטר/ת'},
                {value: 'פרופיילינג – הפעלת סמכות משטרתית על בסיס מראה, צבע עור וכדומה',
                  display: 'פרופיילינג – הפעלת סמכות משטרתית על בסיס מראה, צבע עור וכדומה'},
                {value: 'אחר',
                  display: 'אחר'},
              ]
            },
      services: [ {value: 'קבלת מידע', display: 'מידע על האפשרויות שעומדות בפניי' },
              {value: 'הגשת תלונה', display: 'הגשת תלונה לרשות הרלוונטית' },
            ],
      askForEventDescription: 'תאר בפירוט את האירוע שהתרחש (כולל מקום, תאריך, פרטי השוטר):',
      },

      {value: 1,
       display: 'מאבטח/ת',
       displayValue: 'מאבטח/ת',
       complaints: {
         question: 'מהו סוג האירוע עליו תרצו לדווח?',
         options: [
            {value: 'בידוק מפלה',
             display: 'בידוק מפלה'},
            {value: 'אמירות גזעניות',
             display: 'אמירות גזעניות'},
            {value: 'מניעת כניסה',
             display: 'מניעת כניסה'},
            {value: 'אחר',
             display: 'אחר'}
           ]
         },
        services: [ {value: 'קבלת מידע', display: 'מידע על האפשרויות שעומדות בפניי' },
                    {value: 'הגשת תלונה', display: 'הגשת תלונה לרשות הרלוונטית' },
                  ],
       askForEventDescription: 'תאר בפירוט את האירוע שהתרחש (כולל מקום, תאריך)',
       askForOffenderDetails: [
         {
           question: 'האם ידוע לך שמה של חברת האבטחה?',
           answers: [{
                      value: false,
                      display: 'לא'
                      },
                      {
                       display: 'כן',

                       value: [{
                         question: 'מהו שם חברת האבטחה?',
                         question_key: 'חברת אבטחה'
                       }]
                      }
                ]
        },

        {
          question: 'האם ידוע לך השם של המאבטח/ת?',
          answers: [{ value: false,
                      display: 'לא'
                    },
                     {
                      display: 'כן',
                      value:
                      [{
                        question: 'מה השם של המאבטח/ת?',
                        question_key: 'שם המאבטח/ת'
                      }]
                    }
                ]
          }
       ],

     askForEventLocation: [{
         question: 'היכן התרחש האירוע?',
         answers: [
           {value: 'קניון', display: 'קניון'},
           {value: 'משרד ממשלתי', display: 'משרד ממשלתי (כגון משרד הפנים, הביטוח הלאומי וכו...'},
           {value: 'תחבורה ציבורית', display: 'תחבורה ציבורית (כגון אוטובוס, רכבת, תחנה מרכזית)'},
           {value: 'בית חולים', display: 'בית חולים'},
           {value: 'מועדון', display: 'מועדון'},
           {value: 'נתב"ג', display: 'נתב"ג'},
           {display: 'אחר', value:
            [{
              question: 'היכן התרחש הארוע?',
              question_key: ''
            }]}
         ]
       }]
      },
      {value: 2,
       display: 'גורם  בתחום המגורים/דיור',
       displayValue: 'גורם  בתחום המגורים/דיור',
       complaints: {
          question: 'מהו סוג האירוע עליו תרצו לדווח?',
          options: [
            {
             display: 'הפליה בקבלה לישוב',
             value: {
               value: 'קבלה לישוב',
               followUp: [
                 {question: 'מהו סוג הישוב שקשור לאירוע?',
                 answers: [
                        {value: 'ישוב קהילתי',
                         display: 'ישוב קהילתי'},
                        {value: 'שכונת הרחבה במושב או בקיבוץ',
                          display: 'שכונת הרחבה במושב או בקיבוץ'
                        },
                        {value: 'נחלה בקיבוץ או במושב',
                         display: 'נחלה בקיבוץ או במושב'
                        }
                        ]
                      }],
                    }
            },
            {value: 'הפליה במכירת דירה',
             display: 'מכירת דירה על ידי חברת בניה/יזם/קבלן'},
            {value: 'הפליה בהשכרת דירה מחברה',
             display: 'הפליה בהשכרת דירה מחברה'
            },
            {value: 'הפליה בהשכרת דירה מאדם פרטי',
             display: 'הפליה בהשכרת דירה מאדם פרטי',
            },
            {value: 'אחר',
             display: 'אחר'}
           ]
         },

       askForEventLocation: [ {question: 'היכן התרחש האירוע?', answers: null}],
       services: [ {value: 'קבלת מידע', display: 'מידע על האפשרויות שעומדות בפניי' },
                     {value: 'הגשת תלונה', display: 'הגשת תלונה לרשות הרלוונטית' },
                   ],
       askForEventDescription: 'אנא תאר/י את המקרה, עם כמה שיותר פרטים'
      },

      {value: 3,
       display: 'מסגרת חינוכית',
       displayValue: 'מסגרת חינוכית',
       detailedOffender: {
        question: 'באיזו מסגרת חינוכית מדובר?',
        options: [
                  {display: 'אוניברסיטה/מכללה',
                  value: {
                   value: 'אוניברסיטה/מכללה',
                   followUp: [
                     {
                       question: 'מהו שם המוסד (האוניברסיטה או המכללה)?',
                       question_key: 'שם המוסד האקדמי'
                     }
                   ]
                 }
               },

                  {display: 'בית ספר',
                   value: {
                     value: 'בית ספר',
                     followUp: [
                       {
                         question: 'מהו שם בית הספר?',
                         question_key: 'שם בית הספר'
                       },

                       {
                         question: 'באיזו מסגרת פועל בית הספר?',
                         question_key: 'סוג המסגרת החינוכית',
                         answers: [
                           {
                             display: 'חינוך ממלכתי',
                             value: 'חינוך ממלכתי'
                           },
                           {
                             display: 'חינוך ממלכתי דתי',
                             value: 'חינוך ממלכתי דתי',
                           },
                           {
                             display: 'חינוך חרדי',
                             value: 'חינוך חרדי'
                           },
                           {
                             display: 'חינוך מיוחד',
                             value: 'חינוך מיוחד'
                           },
                           {
                             display: 'אחר',
                             value: 'אחר'
                           }
                         ]
                       }
                     ]
                   }
                },

                  {
                   display: 'גן חובה',
                   value: {
                     value: 'גן חובה',
                     followUp: [
                       {
                         question: 'מהו שם הגן?',
                         question_key: 'שם הגן'
                       },
                       {
                         question: 'באיזו מסגרת פועל הגן?',
                         question_key: 'סוג המסגרת החינוכית',
                         answers: [
                           {
                             display: 'חינוך ממלכתי',
                             value: 'חינוך ממלכתי'
                           },
                           {
                             display: 'חינוך ממלכתי דתי',
                             value: 'חינוך ממלכתי דתי',
                           },
                           {
                             display: 'חינוך חרדי',
                             value: 'חינוך חרדי'
                           },
                           {
                             display: 'חינוך מיוחד',
                             value: 'חינוך מיוחד'
                           },
                           {
                             display: 'אחר',
                             value: 'אחר'
                           }
                         ]
                       }

                     ]
                   },
                 },

                 {
                   display: 'גן טרום חובה',
                   value: {
                     value: 'גן טרום חובה',
                     followUp: [
                       {
                         question: 'מהו שם הגן?',
                         question_key: 'שם הגן'
                     },
                     {
                       question: 'באיזו מסגרת פועל  הגן?',
                       question_key: 'סוג המסגרת החינוכית',
                       answers: [
                         {
                           display: 'חינוך ממלכתי',
                           value: 'חינוך ממלכתי'
                         },
                         {
                           display: 'חינוך ממלכתי דתי',
                           value: 'חינוך ממלכתי דתי',
                         },
                         {
                           display: 'חינוך חרדי',
                           value: 'חינוך חרדי'
                         },
                         {
                           display: 'חינוך מיוחד',
                           value: 'חינוך מיוחד'
                         },
                         {
                           display: 'אחר',
                           value: 'אחר'
                         }
                       ]
                     }

                   ]
                 }
               },

               {
                 display: 'טרום טרום חובה',
                 value:
                   { value: 'טרום טרום חובה',
                     followUp: [
                       {
                         question: 'מהו שם הגן?',
                         question_key: 'שם הגן'
                       },
                       {
                         question: 'באיזו מסגרת פועל הגן?',
                         question_key: 'סוג המסגרת החינוכית',
                         answers: [
                           {
                             display: 'חינוך ממלכתי',
                             value: 'חינוך ממלכתי'
                           },
                           {
                             display: 'חינוך ממלכתי דתי',
                             value: 'חינוך ממלכתי דתי',
                           },
                           {
                             display: 'חינוך חרדי',
                             value: 'חינוך חרדי'
                           },
                           {
                             display: 'חינוך מיוחד',
                             value: 'חינוך מיוחד'
                           },
                           {
                             display: 'אחר',
                             value: 'אחר'
                           }
                         ]
                       }

                     ]
                   }
                 },

                 {
                   display: 'גן פרטי לגיל הרך',
                   value: {
                       value: 'גן פרטי לגיל הרך',
                       followUp: [
                         {
                           question: 'מהו שם הגן?',
                           question_key: 'שם הגן'
                         },
                       ]
                     }
                   },

                 {
                  display: 'חוגים של רשות מקומית',
                  value: {
                    value: 'חוגים של רשות מקומית',
                    followUp: [
                      {
                        question: 'מהו שם החוג או המסגרת?',
                        question_key: 'שם החוג או המסגרת'
                      },
                    ]
                  }
                }
              ]
            },
       complaints: {
         question: 'על איזה רקע, לדעתך, הופלית או נהגו כלפיך בגזענות?',
         options: [
          {value: 'אפליה על רקע מוצא, עדה או לאום, או צבע עור', display: 'מוצא, עדה או לאום, או צבע עור'},
          {value: 'אפליה על רקע דת', display: 'דת'},
          {value: 'אפליה על רקע מין, נטייה מינית או זהות מגדרית', display: 'מין, נטייה מינית או זהות מגדרית'},
          {display: 'אפליה על רקע אחר', value: {
              value: 'אפליה על רקע אחר',
              followUp: [
              {question: 'על איזה רקע התרחשו האירוע או ההפליה?', question_key: 'אפליה על רקע אחר'}
              ]
            }
          }
        ]
      },
       askForEventLocation: [ {question: 'מה כתובת או מיקום הארוע? (אם לא ידוע, כתבו "לא ידוע")', answers: null}],
       askForEventDescription: [
         {
           question: 'תארו את האירוע',
          question_key: 'תיאור נוסף'
          }
        ],
       services: [ {value: 'קבלת מידע', display: 'מידע על האפשרויות שעומדות בפניי' },
               {value: 'הגשת תלונה', display: 'הגשת תלונה לרשות הרלוונטית' },
             ],
      }];
/*      {value: 4,
       display: 'עובד/ת רשות ציבורית',
       displayValue: 'עובד/ת רשות ציבורית',
       complaints: null,
       services: null,
      },

      {value: 5,
       display: 'עובד/ת רשות מקומית',
       displayValue: 'עובד/ת רשות מקומית',
       complaints: null,
       services: null,
      },

      {value: 6,
       display: 'איש/אשת מקצוע',
       displayValue: 'איש/אשת מקצוע',
       complaints: null,
       services: null,
      },

      {value: 7,
       display: 'עסק',
       displayValue: 'עסק',
       complaints: null,
       services: null,
      },

      {value: 8,
       display: 'אדם פרטי',
       displayValue: 'אדם פרטי',
       complaints: null,
       services: null,
      },

      {value: 9,
       display: 'other',
       displayValue: 'אחר',
       complaints: null,
       services: null,
*/

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
    // - Fix the isWorkingHours function
    // - Call the createUser(context, record) at some point in the script
    //   Record the result of this command in the 'agent_link' field
    // - Call updateUser(record) at selected points in the code.
    // - Go over the original flow and make sure all fields were migrated correctly to the script
    // - For uploading files call 'upload(key, uploader)' - it will return the link to the uploaded file

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
                'end': '16:00'},
          };

          if (dayOfTheWeek in workTimes) {
            const [dayStartHour, dayStartMinute] = workTimes[dayOfTheWeek]['start'].split(':');
            const [dayEndtHour, dayEndMinute] = workTimes[dayOfTheWeek]['end'].split(':');
            if (
                (currentHour >= dayStartHour && currentMinute >= dayStartMinute) &&
                (currentHour <= dayEndtHour && currentMinute <= dayEndMinute)
              ) {
                return 'true';
              } else {
                return 'false';
              }
            }
        },
        createUser: async (context, record) => {
          const vid = await this.hubspot.createUser(record);
          context.vid = vid;
          return `https://hasadna.github.io/reportit-agent/?vid=${vid}`;
        },
        saveUser: async (record) => {
          await this.hubspot.updateUser(record);
        },
        uploader: async (key, uploader: FileUploader) => {
          uploader.active = true;
          const uploaded = await this.hubspot.uploadFile(
            uploader.selectedFile, this.hubspot.vid + '/' + key,
              (progress) => { uploader.progress = progress; },
              (success) => { uploader.success = success; }
          );
          return uploaded;
        }
      },
      (key, value) => {}
    ).subscribe(() => { console.log('done!'); });
  }

}
