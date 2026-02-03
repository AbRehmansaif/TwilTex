document.addEventListener('DOMContentLoaded', () => {
    console.log('Twil Tex Premium Loaded');

    // --- Glass Tilt Effect ---
    const cards = document.querySelectorAll('.card-3d, .glass-panel');

    cards.forEach(card => {
        // Add glare element if not present
        let glare = card.querySelector('.glare');
        if (!glare) {
            glare = document.createElement('div');
            glare.classList.add('glare');
            glare.style.cssText = `
                position: absolute;
                top: 0; left: 0; width: 100%; height: 100%;
                background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2), transparent 70%);
                opacity: 0;
                pointer-events: none;
                mix-blend-mode: overlay;
                transition: opacity 0.3s;
                transform: translateZ(1px);
            `;
            card.appendChild(glare);
        }

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Softer tilt for elegant look
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

            // Move glare
            glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.3), transparent 70%)`;
            glare.style.opacity = '1';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            glare.style.opacity = '0';
        });
    });

    // --- Custom Dropdown Implementation (Textile Machine Effect) ---
    initCustomDropdowns();

    // --- Contact Form "Textile Making" Effect ---
    const contactForm = document.getElementById('contactForm');
    const sendBtn = document.getElementById('sendMessageBtn');

    if (contactForm && sendBtn) {
        const btnText = document.getElementById('btnText');
        const btnIcon = document.getElementById('btnIcon');

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // --- Validation Logic ---
            const firstName = document.getElementById('floatingFirstName').value.trim();
            const email = document.getElementById('floatingEmail').value.trim();
            const phone = document.getElementById('floatingPhone').value.trim();
            const subject = document.getElementById('floatingSelect').value;
            const message = document.getElementById('floatingTextarea').value.trim();

            let errors = [];

            if (!firstName) errors.push("First name is required.");
            if (!email && !phone) errors.push("Please provide either an email or a phone number.");
            if (!subject || subject === "Select Subject...") errors.push("Please select a valid subject.");
            if (!message) errors.push("Please write your message.");

            if (errors.length > 0) {
                // Show Error Toast/Message
                updateBtn(errors[0], 'fa-exclamation-triangle');
                sendBtn.classList.add('btn-danger');
                sendBtn.classList.remove('btn-primary-3d');

                setTimeout(() => {
                    updateBtn('Send Message', 'fa-paper-plane');
                    sendBtn.classList.remove('btn-danger');
                    sendBtn.classList.add('btn-primary-3d');
                }, 3000);

                return;
            }

            // --- Success Logic (Existing Animation) ---
            sendBtn.disabled = true;
            updateBtn('Spinning Thread...', 'fa-spinner fa-spin');
            setTimeout(() => {
                updateBtn('Weaving Fabric...', 'fa-layer-group');
                setTimeout(() => {
                    updateBtn('Dyeing Fabric...', 'fa-paint-brush');
                    setTimeout(() => {
                        updateBtn('Quality Check Passed!', 'fa-check-double');
                        setTimeout(() => {
                            updateBtn('Message Sent!', 'fa-paper-plane');
                            sendBtn.classList.remove('btn-primary-3d');
                            sendBtn.classList.add('btn-success');
                            contactForm.reset();
                            // Reset dropdowns
                            resetCustomDropdowns();
                            setTimeout(() => {
                                updateBtn('Send Message', 'fa-paper-plane');
                                sendBtn.classList.remove('btn-success');
                                sendBtn.classList.add('btn-primary-3d');
                                sendBtn.disabled = false;
                            }, 3000);
                        }, 1500);
                    }, 1500);
                }, 1500);
            }, 1500);
        });

        function updateBtn(text, iconClass) {
            btnText.textContent = text;
            btnIcon.className = `fas ${iconClass} ms-2`;
        }
    }

    // --- Natural Textile Line Injection ---
    initTextileLines();
});


function resetCustomDropdowns() {
    // Reset Display
    const countryDisp = document.getElementById('countryDisplay');
    if (countryDisp) countryDisp.textContent = "Select Country...";
}

function initCustomDropdowns() {
    const countryData = [
        { code: 'AF', name: 'Afghanistan', dial: '+93', flag: '🇦🇫' },
        { code: 'AL', name: 'Albania', dial: '+355', flag: '🇦🇱' },
        { code: 'DZ', name: 'Algeria', dial: '+213', flag: '🇩🇿' },
        { code: 'AS', name: 'American Samoa', dial: '+1-684', flag: '🇦🇸' },
        { code: 'AD', name: 'Andorra', dial: '+376', flag: '🇦🇩' },
        { code: 'AO', name: 'Angola', dial: '+244', flag: '🇦🇴' },
        { code: 'AI', name: 'Anguilla', dial: '+1-264', flag: '🇦🇮' },
        { code: 'AQ', name: 'Antarctica', dial: '+672', flag: '🇦🇶' },
        { code: 'AG', name: 'Antigua and Barbuda', dial: '+1-268', flag: '🇦🇬' },
        { code: 'AR', name: 'Argentina', dial: '+54', flag: '🇦🇷' },
        { code: 'AM', name: 'Armenia', dial: '+374', flag: '🇦🇲' },
        { code: 'AW', name: 'Aruba', dial: '+297', flag: '🇦🇼' },
        { code: 'AU', name: 'Australia', dial: '+61', flag: '🇦🇺' },
        { code: 'AT', name: 'Austria', dial: '+43', flag: '🇦🇹' },
        { code: 'AZ', name: 'Azerbaijan', dial: '+994', flag: '🇦🇿' },
        { code: 'BS', name: 'Bahamas', dial: '+1-242', flag: '🇧🇸' },
        { code: 'BH', name: 'Bahrain', dial: '+973', flag: '🇧🇭' },
        { code: 'BD', name: 'Bangladesh', dial: '+880', flag: '🇧🇩' },
        { code: 'BB', name: 'Barbados', dial: '+1-246', flag: '🇧🇧' },
        { code: 'BY', name: 'Belarus', dial: '+375', flag: '🇧🇾' },
        { code: 'BE', name: 'Belgium', dial: '+32', flag: '🇧🇪' },
        { code: 'BZ', name: 'Belize', dial: '+501', flag: '🇧🇿' },
        { code: 'BJ', name: 'Benin', dial: '+229', flag: '🇧🇯' },
        { code: 'BM', name: 'Bermuda', dial: '+1-441', flag: '🇧🇲' },
        { code: 'BT', name: 'Bhutan', dial: '+975', flag: '🇧🇹' },
        { code: 'BO', name: 'Bolivia', dial: '+591', flag: '🇧🇴' },
        { code: 'BA', name: 'Bosnia and Herzegovina', dial: '+387', flag: '🇧🇦' },
        { code: 'BW', name: 'Botswana', dial: '+267', flag: '🇧🇼' },
        { code: 'BR', name: 'Brazil', dial: '+55', flag: '🇧🇷' },
        { code: 'IO', name: 'British Indian Ocean Territory', dial: '+246', flag: '🇮🇴' },
        { code: 'VG', name: 'British Virgin Islands', dial: '+1-284', flag: '🇻🇬' },
        { code: 'BN', name: 'Brunei', dial: '+673', flag: '🇧🇳' },
        { code: 'BG', name: 'Bulgaria', dial: '+359', flag: '🇧🇬' },
        { code: 'BF', name: 'Burkina Faso', dial: '+226', flag: '🇧🇫' },
        { code: 'BI', name: 'Burundi', dial: '+257', flag: '🇧🇮' },
        { code: 'KH', name: 'Cambodia', dial: '+855', flag: '🇰🇭' },
        { code: 'CM', name: 'Cameroon', dial: '+237', flag: '🇨🇲' },
        { code: 'CA', name: 'Canada', dial: '+1', flag: '🇨🇦' },
        { code: 'CV', name: 'Cape Verde', dial: '+238', flag: '🇨🇻' },
        { code: 'KY', name: 'Cayman Islands', dial: '+1-345', flag: '🇰🇾' },
        { code: 'CF', name: 'Central African Republic', dial: '+236', flag: '🇨🇫' },
        { code: 'TD', name: 'Chad', dial: '+235', flag: '🇹🇩' },
        { code: 'CL', name: 'Chile', dial: '+56', flag: '🇨🇱' },
        { code: 'CN', name: 'China', dial: '+86', flag: '🇨🇳' },
        { code: 'CX', name: 'Christmas Island', dial: '+61', flag: '🇨🇽' },
        { code: 'CC', name: 'Cocos Islands', dial: '+61', flag: '🇨🇨' },
        { code: 'CO', name: 'Colombia', dial: '+57', flag: '🇨🇴' },
        { code: 'KM', name: 'Comoros', dial: '+269', flag: '🇰🇲' },
        { code: 'CK', name: 'Cook Islands', dial: '+682', flag: '🇨🇰' },
        { code: 'CR', name: 'Costa Rica', dial: '+506', flag: '🇨🇷' },
        { code: 'HR', name: 'Croatia', dial: '+385', flag: '🇭🇷' },
        { code: 'CU', name: 'Cuba', dial: '+53', flag: '🇨🇺' },
        { code: 'CW', name: 'Curacao', dial: '+599', flag: '🇨🇼' },
        { code: 'CY', name: 'Cyprus', dial: '+357', flag: '🇨🇾' },
        { code: 'CZ', name: 'Czech Republic', dial: '+420', flag: '🇨🇿' },
        { code: 'CD', name: 'Democratic Republic of the Congo', dial: '+243', flag: '🇨🇩' },
        { code: 'DK', name: 'Denmark', dial: '+45', flag: '🇩🇰' },
        { code: 'DJ', name: 'Djibouti', dial: '+253', flag: '🇩🇯' },
        { code: 'DM', name: 'Dominica', dial: '+1-767', flag: '🇩🇲' },
        { code: 'DO', name: 'Dominican Republic', dial: '+1-809, 1-829, 1-849', flag: '🇩🇴' },
        { code: 'TL', name: 'East Timor', dial: '+670', flag: '🇹🇱' },
        { code: 'EC', name: 'Ecuador', dial: '+593', flag: '🇪🇨' },
        { code: 'EG', name: 'Egypt', dial: '+20', flag: '🇪🇬' },
        { code: 'SV', name: 'El Salvador', dial: '+503', flag: '🇸🇻' },
        { code: 'GQ', name: 'Equatorial Guinea', dial: '+240', flag: '🇬🇶' },
        { code: 'ER', name: 'Eritrea', dial: '+291', flag: '🇪🇷' },
        { code: 'EE', name: 'Estonia', dial: '+372', flag: '🇪🇪' },
        { code: 'ET', name: 'Ethiopia', dial: '+251', flag: '🇪🇹' },
        { code: 'FK', name: 'Falkland Islands', dial: '+500', flag: '🇫🇰' },
        { code: 'FO', name: 'Faroe Islands', dial: '+298', flag: '🇫🇴' },
        { code: 'FJ', name: 'Fiji', dial: '+679', flag: '🇫🇯' },
        { code: 'FI', name: 'Finland', dial: '+358', flag: '🇫🇮' },
        { code: 'FR', name: 'France', dial: '+33', flag: '🇫🇷' },
        { code: 'PF', name: 'French Polynesia', dial: '+689', flag: '🇵🇫' },
        { code: 'GA', name: 'Gabon', dial: '+241', flag: '🇬🇦' },
        { code: 'GM', name: 'Gambia', dial: '+220', flag: '🇬🇲' },
        { code: 'GE', name: 'Georgia', dial: '+995', flag: '🇬🇪' },
        { code: 'DE', name: 'Germany', dial: '+49', flag: '🇩🇪' },
        { code: 'GH', name: 'Ghana', dial: '+233', flag: '🇬🇭' },
        { code: 'GI', name: 'Gibraltar', dial: '+350', flag: '🇬🇮' },
        { code: 'GR', name: 'Greece', dial: '+30', flag: '🇬🇷' },
        { code: 'GL', name: 'Greenland', dial: '+299', flag: '🇬🇱' },
        { code: 'GD', name: 'Grenada', dial: '+1-473', flag: '🇬🇩' },
        { code: 'GU', name: 'Guam', dial: '+1-671', flag: '🇬🇺' },
        { code: 'GT', name: 'Guatemala', dial: '+502', flag: '🇬🇹' },
        { code: 'GG', name: 'Guernsey', dial: '+44-1481', flag: '🇬🇬' },
        { code: 'GN', name: 'Guinea', dial: '+224', flag: '🇬🇳' },
        { code: 'GW', name: 'Guinea-Bissau', dial: '+245', flag: '🇬🇼' },
        { code: 'GY', name: 'Guyana', dial: '+592', flag: '🇬🇾' },
        { code: 'HT', name: 'Haiti', dial: '+509', flag: '🇭🇹' },
        { code: 'HN', name: 'Honduras', dial: '+504', flag: '🇭🇳' },
        { code: 'HK', name: 'Hong Kong', dial: '+852', flag: '🇭🇰' },
        { code: 'HU', name: 'Hungary', dial: '+36', flag: '🇭🇺' },
        { code: 'IS', name: 'Iceland', dial: '+354', flag: '🇮🇸' },
        { code: 'IN', name: 'India', dial: '+91', flag: '🇮🇳' },
        { code: 'ID', name: 'Indonesia', dial: '+62', flag: '🇮🇩' },
        { code: 'IR', name: 'Iran', dial: '+98', flag: '🇮🇷' },
        { code: 'IQ', name: 'Iraq', dial: '+964', flag: '🇮🇶' },
        { code: 'IE', name: 'Ireland', dial: '+353', flag: '🇮🇪' },
        { code: 'IM', name: 'Isle of Man', dial: '+44-1624', flag: '🇮🇲' },
        { code: 'IL', name: 'Israel', dial: '+972', flag: '🇮🇱' },
        { code: 'IT', name: 'Italy', dial: '+39', flag: '🇮🇹' },
        { code: 'CI', name: 'Ivory Coast', dial: '+225', flag: '🇨🇮' },
        { code: 'JM', name: 'Jamaica', dial: '+1-876', flag: '🇯🇲' },
        { code: 'JP', name: 'Japan', dial: '+81', flag: '🇯🇵' },
        { code: 'JE', name: 'Jersey', dial: '+44-1534', flag: '🇯🇪' },
        { code: 'JO', name: 'Jordan', dial: '+962', flag: '🇯🇴' },
        { code: 'KZ', name: 'Kazakhstan', dial: '+7', flag: '🇰🇿' },
        { code: 'KE', name: 'Kenya', dial: '+254', flag: '🇰🇪' },
        { code: 'KI', name: 'Kiribati', dial: '+686', flag: '🇰🇮' },
        { code: 'XK', name: 'Kosovo', dial: '+383', flag: '🇽🇰' },
        { code: 'KW', name: 'Kuwait', dial: '+965', flag: '🇰🇼' },
        { code: 'KG', name: 'Kyrgyzstan', dial: '+996', flag: '🇰🇬' },
        { code: 'LA', name: 'Laos', dial: '+856', flag: '🇱🇦' },
        { code: 'LV', name: 'Latvia', dial: '+371', flag: '🇱🇻' },
        { code: 'LB', name: 'Lebanon', dial: '+961', flag: '🇱🇧' },
        { code: 'LS', name: 'Lesotho', dial: '+266', flag: '🇱🇸' },
        { code: 'LR', name: 'Liberia', dial: '+231', flag: '🇱🇷' },
        { code: 'LY', name: 'Libya', dial: '+218', flag: '🇱🇾' },
        { code: 'LI', name: 'Liechtenstein', dial: '+423', flag: '🇱🇮' },
        { code: 'LT', name: 'Lithuania', dial: '+370', flag: '🇱🇹' },
        { code: 'LU', name: 'Luxembourg', dial: '+352', flag: '🇱🇺' },
        { code: 'MO', name: 'Macau', dial: '+853', flag: '🇲🇴' },
        { code: 'MK', name: 'North Macedonia', dial: '+389', flag: '🇲🇰' },
        { code: 'MG', name: 'Madagascar', dial: '+261', flag: '🇲🇬' },
        { code: 'MW', name: 'Malawi', dial: '+265', flag: '🇲🇼' },
        { code: 'MY', name: 'Malaysia', dial: '+60', flag: '🇲🇾' },
        { code: 'MV', name: 'Maldives', dial: '+960', flag: '🇲🇻' },
        { code: 'ML', name: 'Mali', dial: '+223', flag: '🇲🇱' },
        { code: 'MT', name: 'Malta', dial: '+356', flag: '🇲🇹' },
        { code: 'MH', name: 'Marshall Islands', dial: '+692', flag: '🇲🇭' },
        { code: 'MR', name: 'Mauritania', dial: '+222', flag: '🇲🇷' },
        { code: 'MU', name: 'Mauritius', dial: '+230', flag: '🇲🇺' },
        { code: 'YT', name: 'Mayotte', dial: '+262', flag: '🇾🇹' },
        { code: 'MX', name: 'Mexico', dial: '+52', flag: '🇲🇽' },
        { code: 'FM', name: 'Micronesia', dial: '+691', flag: '🇫🇲' },
        { code: 'MD', name: 'Moldova', dial: '+373', flag: '🇲🇩' },
        { code: 'MC', name: 'Monaco', dial: '+377', flag: '🇲🇨' },
        { code: 'MN', name: 'Mongolia', dial: '+976', flag: '🇲🇳' },
        { code: 'ME', name: 'Montenegro', dial: '+382', flag: '🇲🇪' },
        { code: 'MS', name: 'Montserrat', dial: '+1-664', flag: '🇲🇸' },
        { code: 'MA', name: 'Morocco', dial: '+212', flag: '🇲🇦' },
        { code: 'MZ', name: 'Mozambique', dial: '+258', flag: '🇲🇿' },
        { code: 'MM', name: 'Myanmar', dial: '+95', flag: '🇲🇲' },
        { code: 'NA', name: 'Namibia', dial: '+264', flag: '🇳🇦' },
        { code: 'NR', name: 'Nauru', dial: '+674', flag: '🇳🇷' },
        { code: 'NP', name: 'Nepal', dial: '+977', flag: '🇳🇵' },
        { code: 'NL', name: 'Netherlands', dial: '+31', flag: '🇳🇱' },
        { code: 'NC', name: 'New Caledonia', dial: '+687', flag: '🇳🇨' },
        { code: 'NZ', name: 'New Zealand', dial: '+64', flag: '🇳🇿' },
        { code: 'NI', name: 'Nicaragua', dial: '+505', flag: '🇳🇮' },
        { code: 'NE', name: 'Niger', dial: '+227', flag: '🇳🇪' },
        { code: 'NG', name: 'Nigeria', dial: '+234', flag: '🇳🇬' },
        { code: 'NU', name: 'Niue', dial: '+683', flag: '🇳🇺' },
        { code: 'NF', name: 'Norfolk Island', dial: '+672', flag: '🇳🇫' },
        { code: 'KP', name: 'North Korea', dial: '+850', flag: '🇰🇵' },
        { code: 'MP', name: 'Northern Mariana Islands', dial: '+1-670', flag: '🇲🇵' },
        { code: 'NO', name: 'Norway', dial: '+47', flag: '🇳🇴' },
        { code: 'OM', name: 'Oman', dial: '+968', flag: '🇴🇲' },
        { code: 'PK', name: 'Pakistan', dial: '+92', flag: '🇵🇰' },
        { code: 'PW', name: 'Palau', dial: '+680', flag: '🇵🇼' },
        { code: 'PS', name: 'Palestine', dial: '+970', flag: '🇵🇸' },
        { code: 'PA', name: 'Panama', dial: '+507', flag: '🇵🇦' },
        { code: 'PG', name: 'Papua New Guinea', dial: '+675', flag: '🇵🇬' },
        { code: 'PY', name: 'Paraguay', dial: '+595', flag: '🇵🇾' },
        { code: 'PE', name: 'Peru', dial: '+51', flag: '🇵🇪' },
        { code: 'PH', name: 'Philippines', dial: '+63', flag: '🇵🇭' },
        { code: 'PN', name: 'Pitcairn', dial: '+64', flag: '🇵🇳' },
        { code: 'PL', name: 'Poland', dial: '+48', flag: '🇵🇱' },
        { code: 'PT', name: 'Portugal', dial: '+351', flag: '🇵🇹' },
        { code: 'PR', name: 'Puerto Rico', dial: '+1-787, 1-939', flag: '🇵🇷' },
        { code: 'QA', name: 'Qatar', dial: '+974', flag: '🇶🇦' },
        { code: 'CG', name: 'Republic of the Congo', dial: '+242', flag: '🇨🇬' },
        { code: 'RE', name: 'Reunion', dial: '+262', flag: '🇷🇪' },
        { code: 'RO', name: 'Romania', dial: '+40', flag: '🇷🇴' },
        { code: 'RU', name: 'Russia', dial: '+7', flag: '🇷🇺' },
        { code: 'RW', name: 'Rwanda', dial: '+250', flag: '🇷🇼' },
        { code: 'BL', name: 'Saint Barthelemy', dial: '+590', flag: '🇧🇱' },
        { code: 'SH', name: 'Saint Helena', dial: '+290', flag: '🇸🇭' },
        { code: 'KN', name: 'Saint Kitts and Nevis', dial: '+1-869', flag: '🇰🇳' },
        { code: 'LC', name: 'Saint Lucia', dial: '+1-758', flag: '🇱🇨' },
        { code: 'MF', name: 'Saint Martin', dial: '+590', flag: '🇲🇫' },
        { code: 'PM', name: 'Saint Pierre and Miquelon', dial: '+508', flag: '🇵🇲' },
        { code: 'VC', name: 'Saint Vincent and the Grenadines', dial: '+1-784', flag: '🇻🇨' },
        { code: 'WS', name: 'Samoa', dial: '+685', flag: '🇼🇸' },
        { code: 'SM', name: 'San Marino', dial: '+378', flag: '🇸🇲' },
        { code: 'ST', name: 'Sao Tome and Principe', dial: '+239', flag: '🇸🇹' },
        { code: 'SA', name: 'Saudi Arabia', dial: '+966', flag: '🇸🇦' },
        { code: 'SN', name: 'Senegal', dial: '+221', flag: '🇸🇳' },
        { code: 'RS', name: 'Serbia', dial: '+381', flag: '🇷🇸' },
        { code: 'SC', name: 'Seychelles', dial: '+248', flag: '🇸🇨' },
        { code: 'SL', name: 'Sierra Leone', dial: '+232', flag: '🇸🇱' },
        { code: 'SG', name: 'Singapore', dial: '+65', flag: '🇸🇬' },
        { code: 'SX', name: 'Sint Maarten', dial: '+1-721', flag: '🇸🇽' },
        { code: 'SK', name: 'Slovakia', dial: '+421', flag: '🇸🇰' },
        { code: 'si', name: 'Slovenia', dial: '+386', flag: '🇸🇮' },
        { code: 'SB', name: 'Solomon Islands', dial: '+677', flag: '🇸🇧' },
        { code: 'SO', name: 'Somalia', dial: '+252', flag: '🇸🇴' },
        { code: 'ZA', name: 'South Africa', dial: '+27', flag: '🇿🇦' },
        { code: 'KR', name: 'South Korea', dial: '+82', flag: '🇰🇷' },
        { code: 'SS', name: 'South Sudan', dial: '+211', flag: '🇸🇸' },
        { code: 'ES', name: 'Spain', dial: '+34', flag: '🇪🇸' },
        { code: 'LK', name: 'Sri Lanka', dial: '+94', flag: '🇱🇰' },
        { code: 'SD', name: 'Sudan', dial: '+249', flag: '🇸🇩' },
        { code: 'SR', name: 'Suriname', dial: '+597', flag: '🇸🇷' },
        { code: 'SJ', name: 'Svalbard and Jan Mayen', dial: '+47', flag: '🇸🇯' },
        { code: 'SZ', name: 'Swaziland', dial: '+268', flag: '🇸🇿' },
        { code: 'SE', name: 'Sweden', dial: '+46', flag: '🇸🇪' },
        { code: 'CH', name: 'Switzerland', dial: '+41', flag: '🇨🇭' },
        { code: 'SY', name: 'Syria', dial: '+963', flag: '🇸🇾' },
        { code: 'TW', name: 'Taiwan', dial: '+886', flag: '🇹🇼' },
        { code: 'TJ', name: 'Tajikistan', dial: '+992', flag: '🇹🇯' },
        { code: 'TZ', name: 'Tanzania', dial: '+255', flag: '🇹🇿' },
        { code: 'TH', name: 'Thailand', dial: '+66', flag: '🇹🇭' },
        { code: 'TG', name: 'Togo', dial: '+228', flag: '🇹🇬' },
        { code: 'TK', name: 'Tokelau', dial: '+690', flag: '🇹🇰' },
        { code: 'TO', name: 'Tonga', dial: '+676', flag: '🇹🇴' },
        { code: 'TT', name: 'Trinidad and Tobago', dial: '+1-868', flag: '🇹🇹' },
        { code: 'TN', name: 'Tunisia', dial: '+216', flag: '🇹🇳' },
        { code: 'TR', name: 'Turkey', dial: '+90', flag: '🇹🇷' },
        { code: 'TM', name: 'Turkmenistan', dial: '+993', flag: '🇹🇲' },
        { code: 'TC', name: 'Turks and Caicos Islands', dial: '+1-649', flag: '🇹🇨' },
        { code: 'TV', name: 'Tuvalu', dial: '+688', flag: '🇹🇻' },
        { code: 'VI', name: 'U.S. Virgin Islands', dial: '+1-340', flag: '🇻🇮' },
        { code: 'UG', name: 'Uganda', dial: '+256', flag: '🇺🇬' },
        { code: 'UA', name: 'Ukraine', dial: '+380', flag: '🇺🇦' },
        { code: 'AE', name: 'United Arab Emirates', dial: '+971', flag: '🇦🇪' },
        { code: 'GB', name: 'United Kingdom', dial: '+44', flag: '🇬🇧' },
        { code: 'US', name: 'United States', dial: '+1', flag: '🇺🇸' },
        { code: 'UY', name: 'Uruguay', dial: '+598', flag: '🇺🇾' },
        { code: 'UZ', name: 'Uzbekistan', dial: '+998', flag: '🇺🇿' },
        { code: 'VU', name: 'Vanuatu', dial: '+678', flag: '🇻🇺' },
        { code: 'VA', name: 'Vatican', dial: '+379', flag: '🇻🇦' },
        { code: 'VE', name: 'Venezuela', dial: '+58', flag: '🇻🇪' },
        { code: 'VN', name: 'Vietnam', dial: '+84', flag: '🇻🇳' },
        { code: 'WF', name: 'Wallis and Futuna', dial: '+681', flag: '🇼🇫' },
        { code: 'EH', name: 'Western Sahara', dial: '+212', flag: '🇪🇭' },
        { code: 'YE', name: 'Yemen', dial: '+967', flag: '🇾🇪' },
        { code: 'ZM', name: 'Zambia', dial: '+260', flag: '🇿🇲' },
        { code: 'ZW', name: 'Zimbabwe', dial: '+263', flag: '🇿🇼' },
    ];

    // --- 1. Country Code Dropdown ---
    const codeWrapper = document.getElementById('countryCodeWrapper');
    if (codeWrapper) {
        setupDropdown(codeWrapper, countryData, 'dial', (item) => `${item.flag} ${item.dial}`);
    }

    // --- 2. Country Selection Dropdown ---
    const countryWrapper = document.getElementById('countryWrapper');
    if (countryWrapper) {
        setupDropdown(countryWrapper, countryData, 'name', (item) => `${item.flag} ${item.name}`);
    }
}

function setupDropdown(wrapper, data, valueKey, displayFn) {
    const btn = wrapper.querySelector('.btn-custom-select');
    const displaySpan = btn.querySelector('span');
    const hiddenInput = wrapper.querySelector('input[type="hidden"]');

    // Create Dropdown List
    const list = document.createElement('div');
    list.className = 'custom-dropdown-list';

    // Search Box (Sticky)
    const searchDiv = document.createElement('div');
    searchDiv.className = 'search-sticky';
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.className = 'form-control form-control-sm';
    searchInput.placeholder = 'Type to search...';
    searchDiv.appendChild(searchInput);
    list.appendChild(searchDiv);

    // List Items Container
    const itemsContainer = document.createElement('div');
    list.appendChild(itemsContainer);

    // Render Items
    function renderItems(filter = '') {
        itemsContainer.innerHTML = '';
        data.forEach(item => {
            const text = displayFn(item);
            if (text.toLowerCase().includes(filter.toLowerCase())) {
                const el = document.createElement('div');
                el.className = 'dropdown-item-custom';
                el.innerHTML = text;
                el.addEventListener('click', () => {
                    displaySpan.textContent = text;
                    displaySpan.className = 'text-white';
                    hiddenInput.value = item[valueKey];
                    closeDropdown();
                });
                itemsContainer.appendChild(el);
            }
        });
    }

    // Toggle Dropdown
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = list.classList.contains('open');
        closeAllDropdowns(); // Close others first
        if (!isOpen) {
            list.classList.add('open');
            renderItems(); // Reset list
            searchInput.value = '';
            searchInput.focus();
        }
    });

    // Search Logic
    searchInput.addEventListener('input', (e) => {
        renderItems(e.target.value);
    });

    // Prevent closing when clicking search input
    searchDiv.addEventListener('click', (e) => e.stopPropagation());

    wrapper.appendChild(list);

    function closeDropdown() {
        list.classList.remove('open');
    }

    // Click outside to close
    document.addEventListener('click', (e) => {
        if (!wrapper.contains(e.target)) {
            closeDropdown();
        }
    });

    // Add function to global registry if we wanted to manage multiple, but simple click outside is enough
}

// --- Animation Observer ---
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before element is fully in view
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Observe text/layout animations
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

    // Observe image reveals
    document.querySelectorAll('.img-reveal').forEach(el => observer.observe(el));
});

function closeAllDropdowns() {
    document.querySelectorAll('.custom-dropdown-list').forEach(el => el.classList.remove('open'));
}

function initTextileLines() {
    // 1. Inject Vertical Warp Lines (Loom Foundation)
    const warp = document.createElement('div');
    warp.className = 'warp-lines';
    document.body.prepend(warp);

    // 2. Inject Static Fabric Texture
    const texture = document.createElement('div');
    texture.className = 'fabric-texture';
    document.body.prepend(texture);

    // 3. Inject Organic Thread Drift (High Impact)
    const threadCount = 12;
    for (let i = 0; i < threadCount; i++) {
        const thread = document.createElement('div');
        thread.className = 'organic-thread';

        // Randomize spawn and movement
        const delay = Math.random() * 20;
        const duration = 15 + Math.random() * 15;
        const top = Math.random() * 100;
        const rotation = (Math.random() - 0.5) * 20;

        thread.style.top = `${top}%`;
        thread.style.left = '-50%';
        thread.style.animationDelay = `-${delay}s`;
        thread.style.animationDuration = `${duration}s`;
        thread.style.transform = `rotate(${rotation}deg)`;

        document.body.appendChild(thread);
    }
}

