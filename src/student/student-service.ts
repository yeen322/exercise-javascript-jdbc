import type {Student} from "@student/student.ts";

export interface StudentService {

    getStudents(): Promise<Student[]>;
    getStudentByNo(no: string): Promise<Student>;

    getStudentByName(name: string): Promise<Student>;

    getStudentByBirthday(birthday: string): Promise<Student>;

    insertStudent(student: Student): Promise<number>;

    insertStudentMulti(students: Student[]): Promise<number>;

    updateStudent(student: Student): Promise<number>;

    updateStudentMulti(students: Student[]): Promise<number>;

    deleteStudentByNo(no: string): Promise<number>;

    deleteStudentByNoMulti(students: Student[]): Promise<number>;

}