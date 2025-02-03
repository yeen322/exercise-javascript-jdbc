import { PostgresStudentService } from "./student/postgres-student-service";
import {Student} from "@student/student.ts";
import {MybatisStudentService} from "@student/mybatis-student-service.ts";

class AppInit {

    public static async main(): Promise<void> {
        let result;
        const service = new MybatisStudentService();

        // console.info("01. 학생 전체 목록을 출력합니다.");
        // result = await service.getStudents();
        // console.info(result);
        // console.info();
        //
        // console.info("02. 학번이 20110101인 을 출력합니다.");
        // result = await service.getStudents();
        // console.info(result);
        // console.info();
        //
        // console.info("03. 이름이 일지매인 학생을 출력합니다.");
        // result = await service.getStudents();
        // console.info(result);
        // console.info();
        //
        // console.info("04. 생일이 1990-03-01인 학생을 출력합니다.");
        // result = await service.getStudents();
        // console.info(result);
        // console.info();
        //
        // console.info("05. 학번이 20110402이고, 이름이 이순삼인 학생을 출력합니다.");
        // let student = new Student ("20110402","이순삼");
        // result= await service.insertStudent(student);
        // console.info(`${result}명의 학생이 등록되었습니다.`);
        // console.info();

    //     console.info("06. 학번이 220110502, 20110602, 20110702, 20110802이고, \n" +
    //     "이름이 이율국, 이소일 ,심순해, 임꺽쩡 학생을 추가합니다.");
    //     let students = [
    //         new Student("20110502","이율국"),
    //         new Student("20110602","이소일"),
    //         new Student("20110702","심순해"),
    //         new Student("20110802","임꺽쩡"),
    //
    // ];
    //     result = await service.insertStudentMulti(students);
    //     console.info(`${result}명의 학생이 등록되었습니다`);
    //     console.info();

        // console.info("07. 학번이 220110902, 20111002, 20111102, 20111202이고, \n" +
        //     "이름이 이상호, 강동화, 김호산, 김정호 학생을 추가합니다.");
        // let students = [
        //     new Student("20110902","이상호"),
        //     new Student("20111002","강동화"),
        //     new Student("20111102","김호산"),
        //     new Student("20111202","김정호"),
        //
        // ];
        // result = await service.insertStudentMultiBatch(students);
        // console.info(`${result}명의 학생이 등록되었습니다`);
        // console.info();

        // console.log("08. 학번 20110401인 학생의 생일을 1990-03-21로 변경합니다.");
        // result = await service.updateStudent(new Student("20110401", "1990-03-21"));
        // console.info(`${result}건이 변경되었습니다.`);
        // console.info();
        //
        // console.log("09. 학번이 20110402인 학생의 생일을 1990-03-25으로 변경합니다.");
        // result = await service.updateStudent(new Student("20110402", "이순삼", new Date("1990-03-25")));
        // console.info(`${result}건이 변경되었습니다.`);
        // console.info();
        //
        // console.log("10. 학번이 20110501, 20110601, 20110701, 20110801인 학생의 생일을 각각 \n" +
        //     "1990-03-01, 1990-04-01, 1990-05-01, 1990-06-01, 1990-07-01, 1990-08-01, 1990-09-01, 1990-10-01으로 변경합니다.");
        // let students = [
        //     new Student("20110501", "이율곡", new Date("1990-03-01")),
        //     new Student("20110601", "이수일", new Date("1990-04-01")),
        //     new Student("20110701", "심순애", new Date("1990-05-01")),
        //     new Student("20110801", "임꺽정", new Date("1990-06-01")),
        //     new Student("20110901", "이상훈", new Date("1990-07-01")),
        //     new Student("20111001", "강동희", new Date("1990-08-01")),
        //     new Student("20111101", "김호성", new Date("1990-09-01")),
        //     new Student("20111201", "김정준", new Date("1990-10-01")),
        // ];
        // result = await service.updateStudentMulti(students);
        // console.info(`${result}건이 변경되었습니다.`);
        // console.info();

        // console.log("11. 학번이 20110401인 학생을 목록에서 제거합니다.");
        // result = await service.deleteStudentByNo("20110401");
        // console.info(`${result}건이 삭제되었습니다.`);
        // console.info();

        console.log("12. 학번이 20110501, 20110601, 20110701, 20110801인 학생을 목록에서 제거합니다.");
        let students = [
            new Student("20110501"),
            new Student("20110601"),
            new Student("20110701"),
            new Student("20110801"),
            new Student("20110901"),
            new Student("20111001"),
            new Student("20111101"),
            new Student("20111201"),
        ];
        result = await service.deleteStudentByNoMulti(students);
        console.info(`${result}건이 삭제되었습니다.`);
        console.info("")


    }
}

AppInit.main()
    .catch(console.error);
