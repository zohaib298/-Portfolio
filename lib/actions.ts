"use server";

export type ContactFormState = {
  success: boolean;
  message?: string;
  errors?: {
    name?: string;
    email?: string;
    message?: string;
  };
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  const errors: NonNullable<ContactFormState["errors"]> = {};

  if (!name) {
    errors.name = "Name is required.";
  }

  if (!email) {
    errors.email = "Email is required.";
  } else if (!EMAIL_RE.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!message) {
    errors.message = "Message is required.";
  } else if (message.length < 10) {
    errors.message = "Message should be at least 10 characters.";
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  try {
    // TODO: wire this up to a real notification service (e.g. Resend, SendGrid)
    // or a database. For now this just logs server-side so the form is fully
    // functional end-to-end and ready to swap the delivery mechanism in.
    console.log("New contact form submission:", { name, email, message });

    return {
      success: true,
      message: "Thanks — I'll get back to you shortly.",
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong on my end. Please try again in a moment.",
    };
  }
}
