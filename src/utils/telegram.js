// src/utils/telegram.js

const TELEGRAM_BOT_TOKEN = '8834067951:AAHFkZfh5YXphdjazTd7vOBSqT1nnSxPeY8';
const TELEGRAM_CHAT_ID = '7355029842'; // Only numeric chat/user ID

export async function sendDateToTelegram(plan) {
  const message = `
💘 *NEW DATE SAVED!* 💘

📅 *Date:* ${plan?.date || 'Not set'}
⏰ *Time:* ${plan?.time || 'Not set'}
📍 *Place:* ${plan?.location || 'Not set'}
🎈 *Activity:* ${plan?.activity || 'Not set'}
📝 *Notes:* ${plan?.notes || 'None'}
  `.trim();

  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    const data = await response.json();
    console.log('Telegram API Response:', data);
    return response.ok;
  } catch (error) {
    console.error('Failed to send Telegram message:', error);
    return false;
  }
}