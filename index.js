const baseurl = 'http://localhost:8000'; // ✅ URL ของ API
let mode = 'CREATE'; // ค่าเริ่มต้นโหมดการทำงาน
let selectedID = ''; // เก็บ ID สำหรับแก้ไขข้อมูล

// ✅ ฟังก์ชันส่งข้อมูลการจอง
const submitData = async () => {
    // รับข้อมูลจากฟอร์ม
    let usernameDOM = document.querySelector('input[name=username]');
    let ageDOM = document.querySelector('input[name=age]');
    let genderDOM = document.querySelector('input[name=gender]:checked');
    let bookingDateDOM = document.querySelector('input[name=bookingDate]');
    let startTimeDOM = document.querySelector('input[name=startTime]');
    let endTimeDOM = document.querySelector('input[name=endTime]');
    let deskNumberDOM = document.querySelector('select[name=deskNumber]');
    let descriptionDOM = document.querySelector('textarea[name=description]');
    let messageDOM = document.getElementById('message');

    // ✅ สร้างข้อมูลการจอง
    let bookingData = {
        username: usernameDOM.value.trim(),
        age: parseInt(ageDOM.value),
        gender: genderDOM ? genderDOM.value : '',
        bookingDate: bookingDateDOM.value,
        startTime: startTimeDOM.value,
        endTime: endTimeDOM.value,
        deskNumber: deskNumberDOM.value,
        description: descriptionDOM.value.trim(),
    };

    // ✅ ตรวจสอบข้อมูลก่อนส่ง
    if (!validateData(bookingData)) {
        return; // ❗️ หยุดถ้าข้อมูลไม่ถูกต้อง
    }

    try {
        let message = '✅ จองที่นั่งสำเร็จ!';
        if (mode === 'CREATE') {
            const response = await axios.post(`${baseurl}/bookings`, bookingData);
            console.log('✅ Response:', response.data);
        } else {
            const response = await axios.put(`${baseurl}/bookings/${selectedID}`, bookingData);
            message = '✅ แก้ไขข้อมูลสำเร็จ!';
            console.log('✅ Response:', response.data);
        }

        // ✅ รีเซ็ตฟอร์มหลังจากจองสำเร็จ
        resetForm();
        messageDOM.innerText = message;
        messageDOM.className = 'message success';
    } catch (error) {
        console.error('❌ Error submitting data:', error.response?.data || error.message);
        messageDOM.innerText = `❌ เกิดข้อผิดพลาดในการส่งข้อมูล: ${error.response?.data?.message || 'กรุณาลองอีกครั้ง'}`;
        messageDOM.className = 'message danger';
    }
};

// ✅ ฟังก์ชันตรวจสอบข้อมูลก่อนส่ง
const validateData = (bookingData) => {
    let errors = [];

    if (!bookingData.username) {
        errors.push('กรุณากรอกชื่อผู้จอง');
    }
    if (!bookingData.age || isNaN(bookingData.age) || bookingData.age < 1 || bookingData.age > 100) {
        errors.push('กรุณากรอกอายุให้ถูกต้อง (1-100 ปี)');
    }
    if (!bookingData.gender) {
        errors.push('กรุณาเลือกเพศ');
    }
    if (!bookingData.bookingDate) {
        errors.push('กรุณาเลือกวันที่จอง');
    }
    if (!bookingData.startTime || !bookingData.endTime) {
        errors.push('กรุณากรอกเวลาเริ่มต้นและเวลาสิ้นสุด');
    }
    if (!bookingData.deskNumber) {
        errors.push('กรุณาเลือกหมายเลขโต๊ะ');
    }
    if (!bookingData.description) {
        errors.push('กรุณากรอกคำอธิบายเพิ่มเติม');
    }

    // ❌ ถ้าพบข้อผิดพลาดแสดงข้อความแจ้งเตือน
    if (errors.length > 0) {
        let errorHTML = '<ul>';
        errors.forEach((error) => {
            errorHTML += `<li>${error}</li>`;
        });
        errorHTML += '</ul>';
        document.getElementById('message').innerHTML = errorHTML;
        document.getElementById('message').className = 'message danger';
        return false;
    }
    return true;
};

// ✅ ฟังก์ชันรีเซ็ตฟอร์ม
const resetForm = () => {
    const form = document.getElementById('booking-form');
    if (form) {
        form.reset(); // ✅ รีเซ็ตฟอร์ม
    }
    document.getElementById('message').innerText = '';
    document.getElementById('message').className = '';
};
