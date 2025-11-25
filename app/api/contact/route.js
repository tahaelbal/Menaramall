import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Champs requis manquants' }), { status: 400 });
    }

    await resend.emails.send({
      from: 'Menara Mall <onboarding@resend.dev>', // tu peux changer le nom ici
      to: process.env.EMAIL_RECEIVER, // ton email de réception
      subject: `Nouveau message de ${name}`,
      html: `
        <h2>📩 Nouveau message depuis le site Menara Mall</h2>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Message :</strong><br>${message}</p>
      `,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Erreur envoi mail:', error);
    return new Response(JSON.stringify({ error: 'Erreur serveur' }), { status: 500 });
  }
}
