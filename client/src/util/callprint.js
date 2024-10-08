import * as ExcelJS from 'exceljs';
export default  async function callPrint (){
try {
    
  async function call(data) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet 1");
    const columns = [

      { header: "Roll Number", key: "roll", width: 20 },
      { header: "Name", key: "name", width: 50 },
      { header: "Department", key: "dept", width: 10 },
      { header: "Mark", key: "mark", width: 10 },
      { header: "Email", key: "email", width: 50 },
    ];
    // for(let i=0;i<examInfo.actualAnswerList.length;i++){
    //   columns.push({header: i+1, key:i+1, width: 10, })
    // }
    worksheet.columns = columns
    data.studentList.map((task, index) => {
  
      worksheet.addRow({
        name: task.name,
        roll: task.rollNumber,
        dept: task.dept,
        email: task.email,
      });
    });
    const blob = await workbook.xlsx.writeBuffer();
    const blobUrl = URL.createObjectURL(new Blob([blob], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
    
    // Create a link and click on it to trigger the download
    const a = document.createElement('a');
    a.href = blobUrl;
  const examName = `${data.name}.xlsx`;
    a.download = examName
    a.click();
    URL.revokeObjectURL(blobUrl);
   }

    fetch('http://localhost:1338/callPrint')
    .then(res => res.json())
    .then( async (data)  => {
        console.log(data);
for(let i=0 ;i<data.length ;i++) {
   await call(data[i])
}
    
    })

} catch (error) {
    console.log(error);
}
}