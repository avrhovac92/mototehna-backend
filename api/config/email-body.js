module.exports = (name, email, phone, message) => `
<div>
    <div style="font-size: 20px; margin-bottom: 10px; color: #666">
        <b>Pozdrav, primili ste poruku preko kontakt forme:</b>
    </div>
    <div style="padding: 20px; border: 2px solid powderblue; border-radius: 10px;">
        <div style="padding: 10px; font-size: 16px; color: #333;">
            <b>Ime:</b>
        </div>
        <div style="padding: 10px; font-size: 12px; color: #999">
            ${name ? name : 'Nije popunjeno'}
        </div>
        <hr style="display: block;margin-top: 0.5em;margin-bottom: 0.5em;margin-left: auto;margin-right: auto;border-style: inset;border-width: 1px;"
        />
        <div style="padding: 10px; font-size: 16px; color: #333;">
            <b>Email:</b>
        </div>
        <div style="padding: 10px; font-size: 12px; color: #999">
            ${email}
        </div>
        <hr style="display: block;margin-top: 0.5em;margin-bottom: 0.5em;margin-left: auto;margin-right: auto;border-style: inset;border-width: 1px;"
        />
        <div style="padding: 10px; font-size: 16px; color: #333;">
            <b>Broj telefona:</b>
        </div>
        <div style="padding: 10px; font-size: 12px; color: #999">
            ${phone ? phone : 'Nije popunjeno'}
        </div>
        <hr style="display: block;margin-top: 0.5em;margin-bottom: 0.5em;margin-left: auto;margin-right: auto;border-style: inset;border-width: 1px;"
        />
        <div style="padding: 10px; font-size: 16px; color: #333;">
            <b>Poruka:</b>
        </div>
        <div style="padding: 10px; font-size: 12px; color: #999">
            ${message}
        </div>
    </div>
</div>`;
