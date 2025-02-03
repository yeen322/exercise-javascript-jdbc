import { Entertainment } from "@/entertainment/entertainment.ts";
import { PostgresEntertainmentService } from "./entertainment/postgres-entertainment-service";
import { PostgresStudentService } from "@student/postgres-student-service.ts";
import * as readline from 'readline';

class appInit2 {
    public static async main() {
        const service = new PostgresEntertainmentService();
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        // 문제 번호를 입력 받음
        rl.question('문제 번호를 입력하세요 (1-15): ', async (answer) => {
            let result;
            switch (answer) {
                case '1':
                    console.info("1.HNU Entertainment의 부서 코드, 이름, 위치를 검색하시오");
                    result = await service.getDepInfo();
                    break;
                case '2':
                    console.info("2. HNU Entertainment의 연예관계자 코드, 이름, 관리자, 급여를 검색하시오");
                    result = await service.getEmpInfo();
                    break;
                case '3':
                    console.info("3. HNU Entertainment에서 제작한 드라마의 코드와 이름을 검색하시오.");
                    result = await service.getDrmInfo();
                    break;
                case '4':
                    console.info("4. 드라마 방영사가 KBC이거나 SBC인 드라마를 검색하시오");
                    result = await service.getDrmPrdKbcSbc();
                    break;
                case '5':
                    console.info("5. 드라마 제작사를 검색하시오. 단, 중복된 값이 있으면 제거하시오.");
                    result = await service.getDrmPrd();
                    break;
                case '6':
                    console.info("6. 연예관계자들의 급여의 총합과 평균 급여액을 계산하시오.");
                    result = await service.getSalSumAvg();
                    break;
                case '7':
                    console.info("7. 방영일자가 아직 확정되지 않은 드라마의 이름을 검색하시오.");
                    result = await service.getNullDrmName();
                    break;
                case '8':
                    console.info("8. 연예관계자에 대해 연예관계자의 이름과 직속 상사의 이름을 검색하시오");
                    result = await service.getEmpBossName();
                    break;
                case '9':
                    console.info("9. 연예관계자에 대해 이름과 급여를 출력하고, 급여의 내림차순으로 정렬하시오. 단, 동일 급여일 때는 이름의 오름차순으로 정렬하시오.");
                    result = await service.getEmpNameSal();
                    break;
                case '10':
                    console.info("10. 모든 연예관계자를 직급별로 그룹화하고, 평균 급여액이 5000 이상인 직급에 대해 연예 관계자의 직급, 평균 급여액, 최소 급여액, 최대 급여액을 검색하시오");
                    result = await service.getEmpGrpSal();
                    break;
                case '11':
                    console.info("11. 모든 연예관계자의 평균 급여액보다 많은 급여를 받는 연예관계자의 이름과 급여를 검색하라.");
                    result = await service.getEmpNameAvg();
                    break;
                case '12':
                    console.info("12. 방영일자가 확정되지 않은 드라마의 방영일자가 2013-05-01로 편성되었습니다. 알맞게 변경하시오.");
                    result = await service.updateDrmDate();
                    break;
                case '13':
                    console.info("13. 연예관계자 김수현 씨가 대리에서 실장으로 승진하고 급여가 20% 증가되었습니다. 알맞게 변경하시오");
                    result = await service.updateEmpSal();
                    break;
                case '14':
                    console.info("14. 우리 회사에 한 명의 임원이 등록되었습니다. 코드는 E903, 이름은 손진현, 관리자는 E901, 급여는 4000입니다. 알맞게 등록하시오.");
                    result = await service.insertEmp();
                    break;
                // case '15':
                //     console.info("15. 연예관계자인 손진현님이 퇴직했습니다. 연예관계자 목록에서 제거하시오.");
                //     result = await service.deleteEmp();
                //     break;
                default:
                    console.error("유효하지 않은 문제 번호입니다. 1부터 15 사이의 번호를 입력해주세요.");
                    rl.close();
                    return;
            }

            console.info(result);
            rl.close();
        });
    }
}

appInit2.main()
    .catch(console.error);
