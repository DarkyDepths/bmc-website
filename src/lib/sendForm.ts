/**
 * Posts a form to FormSubmit (https://formsubmit.co), a keyless relay that emails the
 * submission straight to `email`. There is no backend here and no mail server, which is
 * the point: the site is a static export and stays one.
 *
 * The first submission to a new address triggers a one-time activation email. Until
 * someone at that address clicks "Activate Form", nothing is delivered. See the README:
 * the recipient is `CONTACT.email`, which is still a placeholder.
 *
 * Resolves true when FormSubmit accepted the payload. The caller decides what to show;
 * this never throws.
 */
export async function sendForm(
  email: string,
  fields: Record<string, string>,
): Promise<boolean> {
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(email)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        _captcha: 'false',
        _template: 'table',
        ...fields,
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
