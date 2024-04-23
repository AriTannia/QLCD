// Truy cập các phần tử cần thiết
const confButton = document.getElementById('confButton');
const addButton = document.getElementById('addButton');
const deleteButton = document.getElementById('deleteButton');
const editButton = document.getElementById('editButton');
const sendButton = document.getElementById('sendButton');
const inputs = document.querySelectorAll('.section .section_input input, .section .section_input select'); // Lấy các ô đầu vào
const sectionShowTableBody = document.querySelector('.section tbody'); // Bảng trong phần "section show"
const sectionShowTableBody2 = document.querySelector('.section.show tbody'); //Bảng trong phần "section show"



// Hàm thêm dữ liệu vào bảng
function addData() {
    const newRow = document.createElement('tr'); // Tạo hàng mới
    inputs.forEach(input => {
        const newCell = document.createElement('td');
        newCell.textContent = input.value; // Lấy giá trị từ ô đầu vào và thêm vào ô mới
        newRow.appendChild(newCell); // Thêm ô vào hàng mới
    });

    // Thêm cell trạng thái mặc định
    const stateCell = document.createElement('td');
    stateCell.textContent = 'Chờ xác thực';

    newRow.appendChild(stateCell);

    sectionShowTableBody.appendChild(newRow); // Thêm hàng mới vào bảng
}




// Hàm xóa hàng cuối cùng trong bảng
function deleteData() {
    const lastRow = sectionShowTableBody.querySelector('tr:last-child');
    if (lastRow) {
        sectionShowTableBody.removeChild(lastRow); // Xóa hàng cuối cùng
    }
}

// Hàm chỉnh sửa hàng cuối cùng
function editData() {
    const lastRow = sectionShowTableBody.querySelector('tr:last-child');
    if (lastRow) {
        const cells = lastRow.querySelectorAll('td');
        cells.forEach((cell, index) => {
            if (index < inputs.length) {
                cell.textContent = inputs[index].value; // Cập nhật giá trị mới
            }
        });
    }
}

// Hàm di chuyển dữ liệu từ các ô đầu vào sang bảng trong phần "section show"
function sendAllDataToShowSection() {
    // Xóa các hàng cũ trong bảng "section" để tránh trùng lặp
    sectionShowTableBody2.innerHTML = '';

    // Lấy tất cả các hàng trong bảng "section"
    const rows = sectionShowTableBody.querySelectorAll('tr');

    // Lặp qua các hàng và thêm chúng vào bảng trong phần "section"
    rows.forEach(row => {
        const newRow = document.createElement('tr'); // Tạo hàng mới
        const cells = row.querySelectorAll('td'); // Lấy tất cả các ô trong hàng

        // Lặp qua các ô và sao chép dữ liệu
        cells.forEach(cell => {
            const newCell = document.createElement('td');
            newCell.textContent = cell.textContent; // Sao chép giá trị từ ô cũ sang ô mới
            newRow.appendChild(newCell); // Thêm ô vào hàng mới
        });

        sectionShowTableBody2.appendChild(newRow); // Thêm hàng mới vào bảng trong phần "section"
    });
}




// chức năng chuyển phê duyệt start 

// Hàm xử lý khi nhấp vào ô "Chờ xác thực"
function authenticate(cell, confirmationMessage) {

    const currentStatus = cell.textContent; // Lấy trạng thái hiện tại


    if (currentStatus === 'Chưa đạt' || currentStatus === 'Đã phê duyệt' || currentStatus === 'Chờ xác thực' || currentStatus === 'Waiting for authentication') {
        const userResponse = confirm(confirmationMessage); // Hiển thị hộp thoại xác nhận

        if (userResponse) { // Nếu người dùng chọn "Yes"
            cell.textContent = 'Đã phê duyệt'; // Thay đổi trạng thái thành "Đã phê duyệt"

        } else { // Nếu người dùng chọn "No"
            cell.textContent = 'Chưa đạt'; // Thay đổi trạng thái thành "Chưa đạt"

        }
    }
}

// Sử dụng hàm `authenticate` khi nhấp vào ô
// sectionShowTableBody2.addEventListener('click', function(event) {
//     const cell = event.target;
//     if (cell.tagName.toLowerCase() === 'td') {
//         authenticate(cell, 'Bạn có muốn phê duyệt không?'); // Thay đổi nội dung và màu sắc của ô
//     }
// });

// Hàm xử lý khi nhấp vào ô để xác thực
function handleAuthenticationClick(event) {
    const cell = event.target; // Ô mà người dùng đã nhấp vào
    const confirmationMessage = 'Bạn có muốn phê duyệt không?'; // Thông điệp xác nhận

    // Gọi hàm xác thực với tham số là ô đã nhấp vào và thông điệp xác nhận
    authenticate(cell, confirmationMessage);
}


//chực năng phê duyệt end



// Gán trình lắng nghe sự kiện cho bảng "section show"
sectionShowTableBody2.addEventListener('click', handleAuthenticationClick); // Lắng nghe sự kiện click




// Hàm cập nhật trạng thái trong bảng "section" khi thay đổi ở "section show"
function syncTables() {
    // Xóa các hàng cũ trong bảng "section" để tránh trùng lặp
    sectionShowTableBody.innerHTML = '';

    // Lấy tất cả các hàng trong bảng "section"
    const rows = sectionShowTableBody2.querySelectorAll('tr');

    // Lặp qua các hàng và thêm chúng vào bảng trong phần "section"
    rows.forEach(row => {
        const newRow = document.createElement('tr'); // Tạo hàng mới
        const cells = row.querySelectorAll('td'); // Lấy tất cả các ô trong hàng

        // Lặp qua các ô và sao chép dữ liệu
        cells.forEach(cell => {
            const newCell = document.createElement('td');
            newCell.textContent = cell.textContent; // Sao chép giá trị từ ô cũ sang ô mới
            newRow.appendChild(newCell); // Thêm ô vào hàng mới
        });

        sectionShowTableBody.appendChild(newRow); // Thêm hàng mới vào bảng trong phần "section"
    });
}

// Đồng bộ trạng thái giữa hai bảng khi thay đổi ở "section show"
confButton.addEventListener('click', syncTables); // Đồng bộ khi có sự kiện click
// End chức năng phê duyệt





// Gán sự kiện cho các nút
addButton.addEventListener('click', addData); // Khi nhấn nút "Thêm", thêm dữ liệu vào bảng
deleteButton.addEventListener('click', deleteData); // Khi nhấn nút "Xóa", xóa hàng cuối cùng
editButton.addEventListener('click', editData); // Khi nhấn nút "Chỉnh sửa", chỉnh sửa hàng cuối cùng
sendButton.addEventListener('click', sendAllDataToShowSection); // Khi nhấn nút "Gửi", chuyển dữ liệu từ phần "section" sang "section show"
