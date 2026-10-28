import { Words } from '../components/Motion';

/** PROVISIONAL: drafted only from what this site actually does. Needs client and legal review before launch. */
export default function Privacy() {
  return (
    <>
      <section className="page-head page-head--teal">
        <div className="wrap"><h1><Words text="Privacy notice" immediate /></h1></div>
      </section>
      <section className="section">
        <div className="wrap prose">
          <p className="note">Draft for review. This notice describes what the website does today and will be completed with the business’s registered details before launch.</p>
          <h2>What we collect</h2>
          <p>When you send an enquiry we collect the details you enter: your name, your phone number or email, the type of care you want, how many children and their ages, your general area, preferred dates and times, and any message you write.</p>
          <h2>Why we use it</h2>
          <p>Only to reply to your enquiry and discuss care. We do not sell your details or use them for advertising.</p>
          <h2>Who sees it</h2>
          <p>Kids Castle. Once the enquiry form is connected, the service that delivers the form to us will also process it on our behalf; we will name it here.</p>
          <h2>Cookies and tracking</h2>
          <p>This site does not currently use cookies, analytics or advertising trackers.</p>
          <h2>How long we keep it</h2>
          <p>Retention period to be confirmed.</p>
          <h2>Your rights</h2>
          <p>You can ask to see, correct or delete the information we hold about you, and you can complain to the Information Commissioner’s Office (ico.org.uk). Contact details for requests are being confirmed; until then, use the enquiry form and mark your message as a privacy request.</p>
        </div>
      </section>
    </>
  );
}
