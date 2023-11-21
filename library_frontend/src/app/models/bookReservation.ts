export interface BookReservation{
    id : number;
    bookId : string;
    studentId : string;
    librarianId : string;
    fromDate : Date;
    toDate: Date;
    isComplete: boolean;
    bookName: string;
    studentName: string;
    librarianName: string;
}