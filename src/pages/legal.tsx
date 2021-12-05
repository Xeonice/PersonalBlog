import * as React from 'react';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Link from '../components/Link';
import { section } from '../components/Box';
import {
  Heading1,
  Heading2,
  Heading4,
  Paragraph,
  TextSmall,
} from '../components/Typography';

const Legal: React.FunctionComponent = function () {
  return (
    <Layout>
      <SEO title="Legal Information" />
      <section maxWidth="640px" marginTop={32} marginBottom={32}>
        <Heading1>Legal Information</Heading1>
        <Heading2>Pursuant to § 5 TMG:</Heading2>
        <Paragraph>
          Rathes Sachchithananthan
          {' '}
          <br />
          Braderijstraat 5
          {' '}
          <br />
          9000 Gent, Belgium
        </Paragraph>
        <Heading2>Contact</Heading2>
        <Paragraph>
          Phone: +32 483 463 944
          {' '}
          <br />
          E-Mail: hello@rathes.me
        </Paragraph>
        <Heading2>Disclaimer</Heading2>
        <Heading4 element="h3">Google Analytics</Heading4>
        <Paragraph>
          This website uses Google Analytics, a web analytics service provided
          by Google, Inc. (“Google”). Google Analytics uses “cookies”, which are
          text files placed on your computer, to help the website analyze how
          users use the site. The information generated by the cookie about your
          use of the website will be transmitted to and stored by Google on
          servers in the United States .
        </Paragraph>
        <Paragraph>
          In case IP-anonymisation is activated on this website, your IP address
          will be truncated within the area of Member States of the European
          Union or other parties to the Agreement on the European Economic Area.
          Only in exceptional cases the whole IP address will be first
          transfered to a Google server in the USA and truncated there. The
          IP-anonymisation is active on this website.
        </Paragraph>
        <Paragraph>
          Google will use this information on behalf of the operator of this
          website for the purpose of evaluating your use of the website,
          compiling reports on website activity for website operators and
          providing them other services relating to website activity and
          internet usage.
        </Paragraph>
        <Paragraph>
          The IP-address, that your Browser conveys within the scope of Google
          Analytics, will not be associated with any other data held by Google.
          You may refuse the use of cookies by selecting the appropriate
          settings on your browser, however please note that if you do this you
          may not be able to use the full functionality of this website. You can
          also opt-out from being tracked by Google Analytics with effect for
          the future by downloading and installing Google Analytics Opt-out
          Browser Addon for your current web browser:
          {' '}
          <Link
            color="white"
            underline
            href="http://tools.google.com/dlpage/gaoptout?hl=en"
          >
            http://tools.google.com/dlpage/gaoptout?hl=en
          </Link>
          .
        </Paragraph>
        <Heading2>Limitation of liability for internal content</Heading2>
        <Paragraph>
          The content of our website has been compiled with meticulous care and
          to the best of our knowledge. However, we cannot assume any liability
          for the up-to-dateness, completeness or accuracy of any of the pages.
        </Paragraph>
        <Paragraph>
          Pursuant to section 7, para. 1 of the TMG (Telemediengesetz – Tele
          Media Act by German law), we as service providers are liable for our
          own content on these pages in accordance with general laws. However,
          pursuant to sections 8 to 10 of the TMG, we as service providers are
          not under obligation to monitor external information provided or
          stored on our website. Once we have become aware of a specific
          infringement of the law, we will immediately remove the content in
          question. Any liability concerning this matter can only be assumed
          from the point in time at which the infringement becomes known to us.
        </Paragraph>
        <Heading4 element="h3">
          Limitation of liability for external links
        </Heading4>
        <Paragraph>
          Our website contains links to the websites of third parties (“external
          links”). As the content of these websites is not under our control, we
          cannot assume any liability for such external content. In all cases,
          the provider of information of the linked websites is liable for the
          content and accuracy of the information provided. At the point in time
          when the links were placed, no infringements of the law were
          recognisable to us. As soon as an infringement of the law becomes
          known to us, we will immediately remove the link in question.
        </Paragraph>
        <Heading4 element="h3">Copyright</Heading4>
        <Paragraph>
          The content and works published on this website are governed by the
          copyright laws of Germany. Any duplication, processing, distribution
          or any form of utilisation beyond the scope of copyright law shall
          require the prior written consent of the author or authors in
          question.
        </Paragraph>
        <Heading4 element="h3">Data protection</Heading4>
        <Paragraph>
          A visit to our website can result in the storage on our server of
          information about the access (date, time, page accessed). This does
          not represent any analysis of personal data (e.g., name, address or
          e-mail address). If personal data are collected, this only occurs – to
          the extent possible – with the prior consent of the user of the
          website. Any forwarding of the data to third parties without the
          express consent of the user shall not take place.
        </Paragraph>
        <Paragraph>
          We would like to expressly point out that the transmission of data via
          the Internet (e.g., by e-mail) can offer security vulnerabilities. It
          is therefore impossible to safeguard the data completely against
          access by third parties. We cannot assume any liability for damages
          arising as a result of such security vulnerabilities.
        </Paragraph>
        <Paragraph>
          The use by third parties of all published contact details for the
          purpose of advertising is expressly excluded. We reserve the right to
          take legal steps in the case of the unsolicited sending of advertising
          information; e.g., by means of spam mail.
        </Paragraph>
        <TextSmall element="p">
          Source:
          {' '}
          <Link
            color="white"
            underline
            href="http://www.mustervorlage.net/disclaimer-muster#Englisch"
          >
            English Disclaimer on Mustervorlage.net
          </Link>
        </TextSmall>
      </section>
    </Layout>
  );
};

export default Legal;
