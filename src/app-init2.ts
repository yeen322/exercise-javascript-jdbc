import {Entertainment} from "@/entertainment/entertainment.ts";
import { PostgresEntertainmentService } from "./entertainment/postgres-entertainment-service";
import {PostgresStudentService} from "@student/postgres-student-service.ts";


class appInit2 {
    public static async main() {
        let result;
        const service = new PostgresEntertainmentService();

        // console.info("1.HNU Entertainment의 부서 코드, 이름, 위치를 검색하시오");
        // result = await service.getDepInfo();
        // console.info(result);
        // console.info()

        // console.info("2. HNU Entertainment의 연예관계자 코드, 이름, 관리자, 급여를 검색하시오");
        // result = await service.getEmpInfo();
        // console.info(result);
        // console.info();

        // console.info("3. HNU Entertainment에서 제작한 드라마의 코드와 이름을 검색하시오.");
        // result = await service.getDrmInfo();
        // console.info(result);
        // console.info();

        // console.info("4. 드라마 방영사가 KBC이거나 SBC인 드라마를 검색하시오");
        // result = await service.getDrmPrdKbcSbc();
        // console.info(result);
        // console.info();

        // console.info("5. 드라마 제작사를 검색하시오. 단, 중복된 값이 있으면 제거하시오.");
        // result = await service.getDrmPrd();
        // console.info(result);
        // console.info();

        // console.info("6. 연예관계자들의 급여의 총합과 평균 급여액을 계산하시오.");
        // result = await service.getSalSumAvg();
        // console.info(result);
        // console.info();

        console.info("7. 방영일자가 아직 확정되지 않은 드라마의 이름을 검색하시오.");
        result = await service.getNullDrmName();
        console.info(result);
        console.info();

        // console.info("8. 연예관계자에 대해 연예관계자의 이름과 직속 상사의 이름을 검색하시오");
        // result = await service.getSalSumAvg();
        // console.info(result);
        // console.info();
        //
        // console.info("9. 연예관계자에 대해 이름과 급여를 출력하고, 급여의 내림차순으로 정렬하시오. 단, 동일 급여일 때는 이름의 오름차순으로 정렬하시오.");
        // result = await service.getSalSumAvg();
        // console.info(result);
        // console.info();
        //
        // console.info("10. 모든 연예관계자를 직급별로 그룹화하고, 평균 급여액이 5000 이상인 직급에 대해 연예 관계자의 직급, 평균 급여액, 최소 급여액, 최대 급여액을 검색하시오");
        // result = await service.getSalSumAvg();
        // console.info(result);
        // console.info();
    }
}

appInit2.main()
    .catch(console.error);

