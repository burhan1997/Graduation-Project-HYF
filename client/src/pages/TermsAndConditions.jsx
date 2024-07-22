import React from "react";
import { useNavigate } from "react-router-dom";

const TermsAndConditions = () => {
  const navigate = useNavigate();

  return (
    <div className="terms-container">
      <h1>Terms and Conditions</h1>
      <p>Last updated: [Insert Date]</p>

      <h2>1. Introduction</h2>
      <p>
        Welcome to [Your Company]. These Terms and Conditions govern your use of
        our website and services. By accessing or using our website, you agree
        to be bound by these Terms and Conditions.
      </p>

      <h2>2. Intellectual Property</h2>
      <p>
        All content on our website, including but not limited to text, graphics,
        logos, and images, is the property of [Your Company] and is protected by
        applicable intellectual property laws. You may not use, reproduce, or
        distribute any content without our prior written permission.
      </p>

      <h2>3. Use of Services</h2>
      <p>
        You agree to use our services only for lawful purposes and in compliance
        with all applicable laws and regulations. You may not use our services
        to engage in any fraudulent, harmful, or illegal activities.
      </p>

      <h2>4. Limitation of Liability</h2>
      <p>
        We are not liable for any damages arising out of or in connection with
        your use of our website or services. This includes, but is not limited
        to, direct, indirect, incidental, and consequential damages.
      </p>

      <h2>5. Changes to Terms</h2>
      <p>
        We reserve the right to modify these Terms and Conditions at any time.
        Any changes will be effective immediately upon posting on our website.
        Your continued use of our website or services after any changes
        constitutes your acceptance of the revised Terms and Conditions.
      </p>

      <h2>6. Contact Us</h2>
      <p>
        If you have any questions or concerns about these Terms and Conditions,
        please contact us at [Your Contact Information].
      </p>

      <button className="back-button" onClick={() => navigate(-1)}>
        Go Back
      </button>
    </div>
  );
};

export default TermsAndConditions;
