const BASE_URL = 'http://localhost:8000';

window.onload = async () => {
    await loadData();
    console.log(' Hot Desk Booking Management Page ');
};

// ดึงข้อมูลการจองทั้งหมดจาก API
const loadData = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/bookings`);
        console.log("📌 Data from API:", response.data);

        const bookingDOM = document.getElementById('bookings');
        if (!bookingDOM) {
            console.error("❌ Element #bookings ไม่พบใน HTML");
            return;
        }

        // โหลดข้อมูลการจองทั้งหมดเข้า HTML 
        let htmlData = '<div>';
        for (let i = 0; i < response.data.length; i++) {
            let booking = response.data[i];

            htmlData += `<div>
                ID: ${booking.id} <br>
                ชื่อผู้จอง: ${booking.username} <br>
                อายุ: ${booking.age} <br>
                เพศ: ${booking.gender} <br>
                📅 วันที่จอง: ${booking.bookingDate} <br>
                ⏰ เวลา: ${booking.startTime} - ${booking.endTime} <br>
                🪑 โต๊ะ: ${booking.deskNumber} <br>
                📝 หมายเหตุ: ${booking.description || '-'} <br>
                <a href='index.html?id=${booking.id}'><button>Edit</button></a>
                <button class='delete' data-id='${booking.id}'>Delete</button>
                <hr>
            </div>`;
        }
        htmlData += '</div>';

        bookingDOM.innerHTML = htmlData;

        // เพิ่ม event สำหรับปุ่มลบ
        const deleteDOMS = document.getElementsByClassName('delete');
        for (let i = 0; i < deleteDOMS.length; i++) {
            deleteDOMS[i].addEventListener('click', async (event) => {
                const id = event.target.dataset.id;
                try {
                    if (confirm('คุณต้องการลบการจองนี้หรือไม่?')) {
                        await axios.delete(`${BASE_URL}/bookings/${id}`);
                        await loadData(); // โหลดข้อมูลใหม่หลังจากลบ
                        alert('ลบการจองสำเร็จ! ✅');
                    }
                } catch (error) {
                    console.error('❌ Error deleting booking:', error);
                }
            });
        }
    } catch (error) {
        console.error('❌ Error fetching bookings:', error);
    }
};
