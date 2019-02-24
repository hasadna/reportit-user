import { Component, OnInit } from '@angular/core';
import { ContentService } from 'hatool';
import { HubspotService } from './hubspot.service';
import { FileUploader } from 'hatool';

const offenders =
[
      {value: 0,
      display: 'משטרה',
      displayValue: 'משטרה',
      complaints: [
                {value: 'התנהגות או התבטאות גזענית מצד שוטר/ת',
                  display: 'התנהגות או התבטאות גזענית מצד שוטר/ת'},
                {value: 'פרופיילינג – הפעלת סמכות משטרתית על בסיס מראה, צבע עור וכדומה',
                  display: 'פרופיילינג – הפעלת סמכות משטרתית על בסיס מראה, צבע עור וכדומה'},
                {value: 'אחר',
                  display: 'אחר'},
              ],
      services: [ {value: 'קבלת מידע', display: 'מידע על האפשרויות שעומדות בפניי' },
              {value: 'הגשת תלונה', display: 'הגשת תלונה לרשות הרלוונטית' },
                ],
      relevant_recipients: [ {value: 'מח"ש', display: 'מחלקת חקירות שוטרים (מח"ש)'},
                  {value: 'מחלקת פניות ציבור', display: 'מחלקת פניות ציבור במשטרה' },
                  ],
      },

      {value: 1,
       display: 'מאבטח/ת',
       displayValue: 'מאבט/ת',
       complaints: null,
       services: null,
       relevant_recipients: null,
      },

      {value: 2,
       display: 'עובד/ת רשות ציבורית',
       displayValue: 'עובד/ת רשות ציבורית',
       complaints: null,
       services: null,
       relevant_recipients: null,
      },

      {value: 3,
       display: 'עובד/ת רשות מקומית',
       displayValue: 'עובד/ת רשות מקומית',
       complaints: null,
       services: null,
       relevant_recipients: null,
      },

      {value: 4,
       display: 'איש/אשת מקצוע',
       displayValue: 'איש/אשת מקצוע',
       complaints: null,
       services: null,
       relevant_recipients: null,
      },

      {value: 5,
       display: 'עסק',
       displayValue: 'עסק',
       complaints: null,
       services: null,
       relevant_recipients: null,
      },

      {value: 6,
       display: 'אדם פרטי',
       displayValue: 'אדם פרטי',
       complaints: null,
       services: null,
       relevant_recipients: null,
      },

      {value: 7,
       display: 'other',
       displayValue: 'אחר',
       complaints: null,
       services: null,
       relevant_recipients: null,
     }
];

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
      this.content.addTo('.הכוננים שלנו עובדים בימים א-ה בשעות 9:00 עד 17:00.' +
                         ' כדי שנוכל לחזור אליך במהירות נבקש ממך לענות לנו על כמה שאלות');
      }
    this.content.addTo('כדי שנוכל לטפל בפניה אנו זקוקים לפרטי התקשרות. לא ייעשה בפרטים אלו כל שימוש זולת טיפול בתלונה.');
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
            {value: 'mobilephone', display: 'וואטסאפ'},
            {value: 'facebook', display: 'facebook messenger'},
          ]);

      currentContact.method = await this.content.waitForInput();

      const contactDetailsOptions = {        // question and regex validator for user's detailed contact method
        'phone': {question: 'מה מספר הטלפון שלך?', validator: null},
        'email': {question: 'מה כתובת האימייל שלך?', validator: null},
        'mobilephone': {question: 'מה מספר הוואטסאפ או שם המשתמש/ת שלך?', validator: null},
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

    const vid = await this.hubspot.createUser(hubspotContact);
    hubspotContact.agent_link = `https://hasadna.github.io/reportit-agent/?vid=${vid}`;
    await this.hubspot.updateUser(hubspotContact);



    this.content.addOptions(
      'מי נהג כלפיך בגזענות או באופן מפלה?',
      offenders
    );

    const offenderIndex = await this.content.waitForInput();
    hubspotContact.offender_code = offenderIndex;
    hubspotContact.offender = offenders[offenderIndex].displayValue;

    this.content.addOptions(                                         // choose service type
      'איזו עזרה או סיוע תרצו לקבל מאיתנו?',
      offenders[offenderIndex]['services']
      );

    const requiredService = await this.content.waitForInput();
    hubspotContact.required_service = requiredService;

    this.content.addOptions(
        'מהו סוג האירוע עליו תרצו לדווח או להתייעץ?',
        offenders[offenderIndex].complaints
    );

    const complaintType = await this.content.waitForInput();
    hubspotContact.complaint_type = complaintType;

    this.content.setTextArea();
    this.content.addTo('תאר/י בבקשה בקצרה את הארוע:');         // ask for event detailed description
    const story = await this.content.waitForInput();
    hubspotContact.story = story;

    console.log('story', story);
    // validate there was an input
    await this.hubspot.updateUser(hubspotContact);
    console.log('updated');

    let moreResourcesUpload = true;
    let resourceIndex = 1;

    this.content.addOptions(                                   // upload first resource check
      'האם יש בידיך צילומים, מסמכים או תיעוד של המקרה שתוכל/י להעביר כעת?',
      [
        {value: true, display: 'כן'},
        {value: false, display: 'לא'}
      ]);

    moreResourcesUpload = await this.content.waitForInput();        // upload more resources loop
    while (moreResourcesUpload && resourceIndex <= 5) {

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
      this.hubspot.updateUser(hubspotContact);

      this.content.addTo('מה יש בקובץ ששלחתם?');

      const resouceDescription = await this.content.waitForInput();

      this.content.addOptions(
        'האם יש בידיך עוד צילומים, מסמכים או תיעוד של המקרה שתוכל/י להעביר לנו כעת?',
        [
          {value: true, display: 'כן'},
          {value: false, display: 'לא'}
        ]);

      moreResourcesUpload = await this.content.waitForInput();
      resourceIndex += 1;
    }

    this.content.addTo('תודה לך שפנית אלינו. אנחנו נעבור על כל המידע והחומר ששלחת לנו ונחזור אליך תוך X ימים.');

  }

}
