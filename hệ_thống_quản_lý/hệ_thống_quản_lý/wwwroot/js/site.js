// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.


// Truy cập vào các phần tử
const editButton = document.getElementById('editButton');
const addButton = document.getElementById('addButton');
const deleteButton = document.getElementById('deleteButton');
const inputs = document.querySelectorAll('.section_input input');
const table = document.querySelector('table tbody');

// Chức năng thêm dữ liệu vào bảng
function addData() {
    const newRow = document.createElement('tr');
    inputs.forEach(input => {
        const newCell = document.createElement('td');
        newCell.textContent = input.value;  // lấy giá trị từ input và thêm vào cell
        newRow.appendChild(newCell);
    });
    table.appendChild(newRow); // thêm row mới vào bảng
}

// Chức năng xóa dòng cuối cùng trong bảng
function deleteData() {
    const lastRow = table.querySelector('tr:last-child');
    if (lastRow) {
        table.removeChild(lastRow);
    }
}

/* Chức năng chỉnh sửa dòng cuối cùng*/
 function editData() {
   const lastRow = table.querySelector('tr:last-child');
   if (lastRow) {
     const cells = lastRow.querySelectorAll('td');
     cells.forEach((cell, index) => {
       if (index < inputs.length) {
         cell.textContent = inputs[index].value;  // cập nhật giá trị mới
       }
     });
     // Đặt lại trạng thái về mặc định
     const stateCell = cells[cells.length - 1]; // Ô trạng thái là ô cuối cùng
     stateCell.textContent = 'Chờ xác thực'; // Đặt lại trạng thái
   }
 }







// Gán sự kiện cho các nút
addButton.addEventListener('click', addData);
deleteButton.addEventListener('click', deleteData);
editButton.addEventListener('click', editData);

// 

//     document.getElementById('sendButton').addEventListener('click', function() {
//     const rows = table.querySelectorAll('tr');
//     rows.forEach(row => {
//         let stateCell = row.cells[row.cells.length - 1];
//         switch (stateCell.textContent) {
//             case '':
//             case 'Xác thực không đạt':
//                 stateCell.textContent = 'Chờ xác thực';
//                 break;
//             case 'Chờ xác thực':
//                 stateCell.textContent = 'Đã xác thực';
//                 break;
//             case 'Đã xác thực':
//                 stateCell.textContent = 'Xác thực không đạt';
//                 break;
//         }
//     });
// });

function addData() {
    const newRow = document.createElement('tr');
    inputs.forEach(input => {
        const newCell = document.createElement('td');
        newCell.textContent = input.value;
        newRow.appendChild(newCell);
    });

    // Thêm cell trạng thái mặc định
    const stateCell = document.createElement('td');
    stateCell.textContent = 'Chờ xác thực';
    stateCell.style.cursor = 'pointer'; // Đặt con trỏ chuột thành pointer để chỉ ra có thể click
    newRow.appendChild(stateCell);

    // Sự kiện click cho stateCell
    stateCell.addEventListener('click', function () {
        // Hiển thị confirm dialog khi click vào trạng thái
        if (confirm('Bạn có muốn xác thực không?')) {
            stateCell.textContent = 'Đã được phê duyệt';
        } else {
            stateCell.textContent = 'Chưa Đạt';
        }
    });

    table.appendChild(newRow);
}