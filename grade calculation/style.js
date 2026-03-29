function grade() {
    const gradeInput = document.getElementById('grade').value;
    const grade = parseFloat(gradeInput);
    let message = '';

    if (grade >= 90) {
        message = 'A';
    } else if (grade >= 80) {
        message = 'B';
    } else if (grade >= 70) {
        message = 'C';
    } else if (grade >= 60) {
        message = 'D';
    } else {
        message = 'F';
    } 
    document.getElementById('result').innerText = `Your grade is: ${message}`;
}