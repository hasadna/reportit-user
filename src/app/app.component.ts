import { Component, OnInit } from '@angular/core';
import { ContentService } from 'hatool';
import { HubspotService } from './hubspot.service';
import { FileUploader } from 'hatool';

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
       complaints: {
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
                 question: 'מהו שם הגן?',
                 question_key: 'שם הגן'
               },
             ]
           }
         }
       ]
     },
       askForEventLocation: [ {question: 'מה כתובת או מיקום הארוע? (אם לא ידוע, כתבו "לא ידוע")', answers: null}],
       askForEventDescription: [
         {
           question: 'על איזה רקע, לדעתך, הופלית או נהגו כלפיך בגזענות?',
           question_key: 'אפליה על רקע',
           answers: [
             {value: 'מוצא, עדה או לאום, או צבע עור', display: 'מוצא, עדה או לאום, או צבע עור'},
             {value: 'דת', display: 'דת'},
             {value: 'מין, נטייה מינית או זהות מגדרית', display: 'מין, נטייה מינית או זהות מגדרית'},
             {display: 'אחר', value:
              [{
                question: 'על איזה רקע התרחשו האירוע או ההפליה?',
                question_key: ''
              }]}
           ]
         },
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

function openCallTime() {
        const m_names = ['ינואר', 'פברואר', 'מרץ',
                        'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר',
                        'אוקטובר', 'נובמבר', 'דצמבר'];

        const d_names = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];

        const myDate = new Date();
        myDate.setDate(myDate.getDate() + 7);
        const curr_date = myDate.toISOString().slice(0, 10);
        const curr_month = myDate.getMonth();
        const curr_day  = myDate.getDay();
        const curr_time = (myDate.getHours(), myDate.getMinutes());
        return ({currentDate: curr_date, dayName: d_names[curr_day], currentTime: curr_time });
    }

@Component({
  selector: 'app-root',
  template: '<htl-hatool></htl-hatool>',
  styleUrls: ['./app.component.less']
})

export class AppComponent implements OnInit {
  title = 'hatool';

  constructor(private content: ContentService,
              private hubspot: HubspotService) {}

  ngOnInit() {
    this.content.sendButtonText = 'שלח/י';
    this.content.uploadFileText = 'לחצ/י לבחירת קובץ';
    this.content.uploadedFileText = 'קובץ הועלה בהצלחה';
    this.content.notUploadedFileText = 'תקלה בהעלאת קובץ';
    this.doIt();
  }

  async doIt() {
    const hubspotContact: any = {};

    this.content.addTo('שלום, הגעת למוקד סיוע לקורבנות גזענות והפליה.');

    //  day + time check and set the expected answer
    const startTime = openCallTime();

    if (['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי'].indexOf(startTime.dayName) >= 0) {
      this.content.addTo('לפני שנעביר את הפניה שלך לכונן, נבקש ממך לענות על כמה שאלות, שיסייעו לנו להשיב במהירות.');
      } else {
      this.content.addTo('המוקדנים שלנו עובדים בימים א-ה בשעות 9:00 עד 17:00.' +
                         ' כדי שנוכל לחזור אליך במהירות נבקש ממך לענות לנו על כמה שאלות');
      }
    this.content.addTo('כדי שנוכל לטפל בפניה אנו זקוקים לפרטי התקשרות.\
     לא ייעשה בפרטים אלו כל שימוש חוץ מטיפול בתלונה בדרך שבה תאשר/י לנו.');
    this.content.addTo('מה השם שלך? אם את/ה רוצ/ה להישאר אנונימי/ת בשלב זה כתבו "אנונימי"');
    const name = await this.content.waitForInput();
    hubspotContact.full_name = name;
    // enable user to leave name input empty

    const contacts = [];
    let askForContacts = true;
    this.content.addTo(`שלום ${name}. איך תרצה/תרצי שניצור איתך קשר בהמשך התהליך?`);
    while (askForContacts || contacts.length === 0) {
      const currentContact = {method: null,
                              details: null};

      this.content.addOptions(
          'בחרו אמצעי התקשרות',
          [
            {value: 'phone', display: 'טלפון'},
            {value: 'email', display: 'דוא"ל'},
            {value: 'whatsapp', display: 'וואטסאפ'},
            {value: 'facebook', display: 'facebook messenger'},
          ]);

      currentContact.method = await this.content.waitForInput();

      const contactDetailsOptions = {        // question and regex validator for user's detailed contact method
        'phone': {question: 'מה מספר הטלפון שלך?', validator: null},
        'email': {question: 'מה כתובת האימייל שלך?', validator: null},
        'whatsapp': {question: 'מה מספר הוואטסאפ או שם המשתמש/ת שלך?', validator: null},
        'facebook': {question: 'מה שם החשבון שלך?', validator: null},
      };

      this.content.addTo(contactDetailsOptions[currentContact.method].question);
      currentContact.details = await this.content.waitForInput();

      contacts.push(currentContact);
      hubspotContact[currentContact.method] = currentContact.details;
      // add input validation, add it to contactDetailsOptions as RegEx

      this.content.addOptions(                                                // check for other communication methods
        'האם ישנם פרטי התקשרות נוספים שתוכלו למסור כדי שנוכל ליצור אתכם קשר?',
        [
          {value: true, display: 'כן'},
          {value: false, display: 'לא'},
        ]
      );


      askForContacts = await this.content.waitForInput();
      this.content.addFrom(askForContacts ? 'כן' : 'לא');
    }

    const vid = await this.hubspot.createUser(hubspotContact);         // * check how to update CRM during the contact details loop
    hubspotContact.agent_link = `https://hasadna.github.io/reportit-agent/?vid=${vid}`;
    await this.hubspot.updateUser(hubspotContact);
    console.log('updated vid');

    this.content.addOptions(
      ' או לאיזה תחום קשור האירוע? מי נהג כלפיך בגזענות או באופן מפלה?',
      offenders
    );
    await this.hubspot.updateUser(hubspotContact);

    const offenderIndex = await this.content.waitForInput();
    const offenderObject = offenders[offenderIndex];   // create an offender object for the rest of the script
    hubspotContact.offender_code = offenderIndex;
    hubspotContact.offender = offenderObject.displayValue;
    await this.hubspot.updateUser(hubspotContact);
    console.log(`updated offender: ${hubspotContact.offender}`);


    this.content.addOptions(                                          // choose complaint type
        offenderObject.complaints.question,
        offenderObject.complaints.options
    );

    const complaintType = await this.content.waitForInput();            // check if complaint type consist specific follow-up questions
    let copmlaintDescription;
    if (typeof(complaintType) === 'object' && 'followUp' in complaintType) {
            // in case of follow up questions ask and combine all answers into a string
        const complaintFollowUpQuestions = complaintType.followUp;
        const followUpAnswers = [];
        for (let followUpQuestionIndex = 0; followUpQuestionIndex <= complaintFollowUpQuestions.length - 1; followUpQuestionIndex++) {
          const questionObject = complaintFollowUpQuestions[followUpQuestionIndex];
          const newQuestion = questionObject.question;
          const question_key = questionObject.question_key;

          if ('answers' in questionObject) {                               // what is the type of the question: options / open question
            this.content.addOptions(newQuestion,  questionObject.answers);
            } else {
            this.content.addTo(newQuestion);
          }
          const newAnswer = await this.content.waitForInput();
          followUpAnswers.push({'key': question_key, 'detail': newAnswer});
        }
        copmlaintDescription = complaintType.value + ', ' + followUpAnswers.map(e => (e.key + ': ' + e.detail)).join(', ');
      } else {                                                     // if there are no follow up questions, just save the string
          copmlaintDescription = complaintType;
          }
    hubspotContact.complaint_type = copmlaintDescription;
    await this.hubspot.updateUser(hubspotContact);
    console.log('updated complaint type');



    if ('askForOffenderDetails' in offenderObject) {                            // check if we should ask optional offender details quetsion
      let answers;
      const offenderDetails = [];
      const offenderDetailsQuestions = offenderObject.askForOffenderDetails;
      for (let questionIndex = 0; questionIndex <= offenderDetailsQuestions.length - 1; questionIndex++) {

        const questionObject = offenderDetailsQuestions[questionIndex];
        const question = questionObject.question;

        if ('answers' in questionObject) {                               // what is the type of the question: options / open question
          this.content.addOptions(question,  questionObject.answers);
          } else {
          this.content.addTo(question);
        }
        const answer = await this.content.waitForInput();

        if (typeof answer === 'object') {                                        // check if we need to handle a follow-up question
          const followUpQuestions = answer;
          for (let followUpQuestionIndex = 0; followUpQuestionIndex <= followUpQuestions.length - 1; followUpQuestionIndex++) {
            const newQuestion = followUpQuestions[followUpQuestionIndex].question;
            const question_key = followUpQuestions[followUpQuestionIndex].question_key;

            this.content.addTo(newQuestion);
            const newAnswer = await this.content.waitForInput();
            offenderDetails.push({'key': question_key, 'detail': newAnswer});

          }
          answers = offenderDetails.map(e => (e.key + ': ' + e.detail)).join(', ');
        } else {
          answers = answer;
        }
      }
      hubspotContact.offender_person_details = answers;
      await this.hubspot.updateUser(hubspotContact);
      console.log('updated offender_person_details');
    }


    if ('askForEventLocation' in offenderObject) {     // check if/how we should ask for the event location
      const locationDetails = [];
      let answers;
      const locationDetailsQuestions = offenderObject.askForEventLocation;
      for (let questionIndex = 0; questionIndex <= locationDetailsQuestions.length - 1; questionIndex++) {

        const questionObject = locationDetailsQuestions[questionIndex];
        const question = questionObject.question;

        if ('answers' in questionObject && questionObject.answers != null) {  // what is the type of the question: options / open question
          this.content.addOptions(question,  questionObject.answers);
          } else {
          this.content.addTo(question);
        }
        const answer = await this.content.waitForInput();

        if (typeof answer === 'object') {                                        // check if we need to handle a follow-up question
          const followUpQuestions = answer;
          for (let followUpQuestionIndex = 0; followUpQuestionIndex <= followUpQuestions.length - 1; followUpQuestionIndex++) {
              const newQuestion = followUpQuestions[followUpQuestionIndex].question;
              const question_key = followUpQuestions[followUpQuestionIndex].question_key;

              this.content.addTo(newQuestion);
              const newAnswer = await this.content.waitForInput();
              locationDetails.push({'key': question_key, 'detail': newAnswer});
            }

        answers = locationDetails.map(e => (e.key + ': ' + e.detail)).join(', ');
      } else {
        answers = answer;
        }
        }

        hubspotContact.event_location = answers;
        await this.hubspot.updateUser(hubspotContact);
        console.log('updated event_location');
      }

    if ('services' in offenders[offenderIndex]) {
    this.content.addOptions(                                         // choose service type
      'איזו עזרה או סיוע תרצו לקבל מאיתנו?',
      offenders[offenderIndex]['services']
      );
    }

    const requiredService = await this.content.waitForInput();
    hubspotContact.required_service = requiredService;
    await this.hubspot.updateUser(hubspotContact);
    console.log('updated required_service');

    if ('askForEventDescription' in offenderObject) {
      const eventDescriptionQuestions: any = offenderObject.askForEventDescription;

      if (typeof(eventDescriptionQuestions) === 'object') {
            // in case of follow up questions ask and combine all answers into a string
            const followUpAnswers = [];
            console.log(eventDescriptionQuestions);
            for (let followUpQuestionIndex = 0; followUpQuestionIndex <= eventDescriptionQuestions.length - 1; followUpQuestionIndex++) {
              const questionObject = eventDescriptionQuestions[followUpQuestionIndex];
              const newQuestion = questionObject.question;
              const question_key = questionObject.question_key;

              if ('answers' in questionObject) {                               // what is the type of the question: options / open question
                this.content.addOptions(newQuestion,  questionObject.answers);
              } else {
                this.content.addTo(newQuestion);
              }
              const newAnswer = await this.content.waitForInput();
              followUpAnswers.push({'key': question_key, 'detail': newAnswer});
            }
            copmlaintDescription = complaintType.value + ', ' + followUpAnswers.map(e => (e.key + ': ' + e.detail)).join(', ');

          } else {
                                                             // if there is a single (non-object) question, just save the string
            this.content.addTo(eventDescriptionQuestions);
            const newAnswer = await this.content.waitForInput();
            copmlaintDescription = complaintType.value + `, ` + newAnswer;
          }
        hubspotContact.event_description = copmlaintDescription;

        }


    console.log('event_description', copmlaintDescription);
    // validate there was an input
    await this.hubspot.updateUser(hubspotContact);
    console.log('updated event_description');


    let moreResourcesUpload = true;
    let resourceIndex = 1;

    this.content.addOptions(                                   // upload first resource check
      'האם יש בידיך צילומים, מסמכים או תיעוד של המקרה שתוכל/י להעביר כעת?',
      [
        {value: true, display: 'כן'},
        {value: false, display: 'לא'}
      ]);

    moreResourcesUpload = await this.content.waitForInput();        // upload more resources loop
    while (moreResourcesUpload && resourceIndex <= 5) {                       // uploaded files limit, following the CRM fields settings

      this.content.addUploader('אנא בחר/י את הקובץ הרלוונטי');
      const file: FileUploader = await this.content.waitForInput();
      file.active = true;
      const uploaded = await this.hubspot.uploadFile(
          file.selectedFile, this.hubspot.vid + '/file-' + resourceIndex,
          (progress) => { file.progress = progress; },
          (success) => { file.success = success; }
      );
      console.log('UPLOADED', uploaded);
      hubspotContact['file' + resourceIndex] = uploaded;

      this.content.addTo('מה יש בקובץ ששלחתם?');

      const resouceDescription = await this.content.waitForInput();
      hubspotContact['file' + resourceIndex + 'description'] = resouceDescription;
      this.hubspot.updateUser(hubspotContact);

      this.content.addOptions(
        'האם יש בידיך עוד צילומים, מסמכים או תיעוד של המקרה שתוכל/י להעביר לנו כעת?',
        [
          {value: true, display: 'כן'},
          {value: false, display: 'לא'}
        ]);

      moreResourcesUpload = await this.content.waitForInput();
      resourceIndex += 1;
    }

    this.content.addTo('תודה לך שפנית אלינו.\
     אנחנו נעבור על כל המידע והחומר ששלחת ונחזור אליך תוך 2 ימים.');
     // * we should tell the users how (which platform(s)) we will reach them

    this.content.addTo(`לצורכי QA בלבד: \
      <a href="http://hasadna.github.io/reportit-agent/?vid=${vid}" target="_blank"}>\
      קישור להמשך בדיקה, מוקדנים\
      </a>`);
  }

}
