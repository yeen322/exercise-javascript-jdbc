import express from "express";
import { MybatisStudentService } from "@student/mybatis-student-service.ts"
import {Student} from "@student/student.ts";


const router = express.Router();
const service = new MybatisStudentService();

router.get("/", async (req, res) => {
    try {
        const name=req.query.name as string;
        const birthday=req.query.birthday as string;

        let result;
        if(name) {
            result = await service.getStudentByName(name);
        } else if (birthday) {
            result=await service.getStudentByBirthday(birthday);
        } else {
            result = await service.getStudents();
        }
        await service.getStudents();
        res.json(result);
    } catch(error) {
        console.error("Error fetching students: ", error);
        res.status(500)
            .json({error:"Internal Server Error."});
    }
});
router.get("/:no", async (req, res) => {
    try {
        const studentNo = req.params.no;
        const result = await service.getStudentByNo(studentNo);
        res.json(result);
    } catch(error) {
        console.error("Error fetching students: ", error);
        res.status(500)
            .json({error:"Internal Server Error."});
    }
});

router.post("/", async (req, res) => {
    try {
        const student = new Student(req.body.no, req.body.name);
        const result  =await service.insertStudent(student);
        res.json({inserted: result})
    } catch(error) {
        console.error("Error fetching students: ", error);
        res.status(500)
            .json({error:"Internal Server Error."});
    }
});

router.post("/batch", async (req, res) => {
    try {
        const students = req.body.map((student: Student) => new Student(student.no, student.name));

        const result= await service.insertStudentMulti(students);
        res.json({inserted: result});
    } catch(error) {
        console.error("Error fetching students: ", error);
        res.status(500)
            .json({error:"Internal Server Error."});
    }
});

router.patch("/", async (req, res) => {
    try {
        const student = new Student(req.body.no, req.body.name, new Date(req.body.birthday));
        const result = await service.updateStudent(student);
        res.json({updated: result});

    } catch(error) {
        console.error("Error fetching students: ", error);
        res.status(500)
            .json({error:"Internal Server Error."});
    }
});

router.patch("/batch", async (req, res) => {
    try {
        const students: Student[] =
            req.body.map((student: Student) => new Student(student.no, student.name, new Date(student.birthday!!)));
        const result = await service.updateStudentMulti(students);
        res.json({updated: result});

    } catch(error) {
        console.error("Error fetching students: ", error);
        res.status(500)
            .json({error:"Internal Server Error."});
    }
});

router.delete("/", async (req, res) => {
    try {
        const student= new Student(req.body.no);
        const result = await service.deleteStudentByNo(student.no!!);
        res.json({deleted: result});

    } catch(error) {
        console.error("Error fetching students: ", error);
        res.status(500)
            .json({error:"Internal Server Error."});
    }
});

router.delete("/batch", async (req, res) => {
    try {
        const students: Student[] =
            req.body.map((student: Student) => new Student(student.no!!));
        const result = await service.deleteStudentByNoMulti(students);
        res.json({deleted: result});

    } catch(error) {
        console.error("Error fetching students: ", error);
        res.status(500)
            .json({error:"Internal Server Error."});
    }
});

export default router;