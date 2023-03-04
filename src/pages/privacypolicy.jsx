import React from "react";

export const PrivacyPolicyPage = () => {
  return (
    <div className="text-white font-Inter bg-[#000300] py-12 px-4">
      <h1 className="text-3xl font-bold mb-6 px-4">Privacy Policy</h1>
      <div className="px-6 py-4">
        <p className="mb-4 text-sm">
          At [Your Company Name], we take the privacy of our users very
          seriously. This Privacy Policy outlines the information we collect,
          how we use it, and your rights regarding your personal data when you
          use our e-hailing website [Your Website URL]. By using our website,
          you consent to the practices outlined in this policy.
        </p>
        <h2 className="text-xl font-bold mb-4">Information We Collect</h2>
        <p className="mb-4 text-sm">
          We collect information about you when you use our e-hailing website.
          This may include:
        </p>
        <ul className="list-outside list-disc ml-4 mb-4">
          <li className=" text-sm">
            Personal Information: We may collect personal information such as
            your name, phone number, email address, and payment information when
            you create an account and use our services.
          </li>
          <li className=" text-sm">
            Usage Data: We collect information about how you use our website,
            including the type of device you are using, your IP address, the
            pages you visit, and the time and date of your visits.
          </li>
          <li className=" text-sm">
            Location Data: We may collect your location data through your device
            when you use our website to provide you with location-based
            services.
          </li>
          <li className=" text-sm">
            Cookies and Similar Technologies: We use cookies and similar
            technologies to collect information about your browsing behavior on
            our website, including pages visited and links clicked.
          </li>
        </ul>

        <h2 className="text-xl font-bold mb-4 py-3">
          How We Use Your Information
        </h2>
        <p className="mb-4 text-sm">We use your personal information to:</p>
        <ul className="list-disc list-inside mb-4">
          <li className="text-sm">Provide and improve our services to you</li>
          <li className="text-sm">Process your payments and transactions</li>
          <li className="text-sm">
            Communicate with you about your account and our services
          </li>
          <li className="text-sm">
            Analyze how our website is being used and improve our services
          </li>
          <li className="text-sm">Comply with legal obligations</li>
        </ul>
        <p className="mb-4 text-sm">
          We may also use your information for marketing purposes, such as
          sending you promotional emails about our services. You can opt-out of
          receiving marketing emails from us at any time.
        </p>
        <h2 className="text-xl font-bold mb-4">
          How We Share Your Information
        </h2>
        <p className="mb-4 text-sm">
          We may share your personal information with third-party service
          providers who help us provide our services, such as payment processors
          and customer support providers. We may also share your information if
          required by law or to protect our legal rights.
        </p>
        <p className="mb-4 text-sm">
          We do not sell your personal information to third parties.
        </p>
        <h2 className="text-xl font-bold mb-4">
          Your Rights Regarding Your Personal Information
        </h2>
        <p className="mb-4 text-sm">
          You have the right to access and update the personal information we
          have collected about you. You can also request that we delete your
          personal information, although we may need to retain certain
          information for legal or business purposes.
        </p>
        <p className="mb-4 text-sm">
          You can opt-out of receiving marketing emails from us by clicking the
          unsubscribe link in the email.
        </p>
        <h2 className="text-xl font-bold mb-4">Security</h2>
        <p className="mb-4 text-sm">
          We take appropriate measures to protect your personal information from
          unauthorized access, alteration, or disclosure. However, no method of
          transmission over the internet or electronic storage is 100% secure.
        </p>
        <h2 className="text-xl font-bold mb-4">
          Changes to this Privacy Policy
        </h2>
        <p className="mb-4 text-sm">
          We may update this Privacy Policy from time to time. If we make
          significant changes to this policy, we will notify you by email or by
          posting a notice on our website.
        </p>
        <h2 className="text-xl font-bold mb-4">Contact Us</h2>
        <p className="mb-4 text-sm">
          If you have any questions or concerns about our Privacy Policy or how
          we handle your personal information, please contact us at [Your
          Contact Email Address].
        </p>
      </div>
    </div>
  );
};
