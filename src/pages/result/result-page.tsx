import * as S from "../style/style-page.style";
import * as Style from "./result-page.style";

import { Icon } from "@/components";
import { TResultProps } from "@/types/result";
import { useLocation } from "react-router-dom";
import QRCode from "react-qr-code";
import { Triangle, Reactangle, Round } from "@/assets/images/body-check";
import useGetUserInfo from "@/hooks/queries/auth/useGetUserInfo";
import Logo from "@/assets/images/Logo.webp";

const ResultPage = () => {
  const { state }: { state: TResultProps } = useLocation();
  const { data: userInfo } = useGetUserInfo();

  if (userInfo && state)
    return (
      <S.Container>
        <Icon blackNum={3} />
        <S.ContentResultContainer>
          <S.ResultBodyType>
            <img src={Reactangle} alt="icons" className="reactangle" />
            <S.ResultSize>
              <S.ResultTitle>
                {userInfo.userName}님,
                <br />
                <span>{state.bodyTypeName}</span> 체형입니다.
              </S.ResultTitle>
              <S.BodySizeWrapper>
                <h5>*신체치수</h5>
                <ul>
                  <li>
                    키(신장) : <b>{state.userBodySizeResponseDto.height}cm</b>
                  </li>
                  <li>
                    어깨 단면 :
                    <b>
                      {Math.round(state.userBodySizeResponseDto.shoulderSize)}
                      cm
                    </b>
                  </li>
                  <li>
                    가슴 둘레 :
                    <b>
                      {Math.round(state.userBodySizeResponseDto.chestSize)}cm
                    </b>
                  </li>
                  <li>
                    허리 둘레 :
                    <b>
                      {Math.round(state.userBodySizeResponseDto.waistSize)}cm
                    </b>
                  </li>
                  <li>
                    엉덩이 둘레 :
                    <b>{Math.round(state.userBodySizeResponseDto.hipSize)}cm</b>
                  </li>
                </ul>
              </S.BodySizeWrapper>
            </S.ResultSize>
            <S.ResultImg>
              <img src={state.objFile} />
            </S.ResultImg>
          </S.ResultBodyType>

          <S.ResultExplainWrapper>
            <S.ContentWrapper>
              <img src={Triangle} alt="icons" />
              <span>- 체형 특징</span>
              <p>{state.bodyTypeFeature}</p>
            </S.ContentWrapper>
            <S.ContentWrapper>
              <img src={Round} alt="icons" />
              <span>- 코디 주의사항</span>
              <p>{state.bodyTypeCareful}</p>
            </S.ContentWrapper>
          </S.ResultExplainWrapper>
          <Style.ClothWrapper>
            <section>
              <img
                src={state.userStylingResponseDto.userTopClothesDto.imageUrl}
              />

              <img
                src={
                  state.userStylingResponseDto.userBottomClothesItemsDto
                    .imageUrl
                }
              />
            </section>
            <Style.QRImg>
              <QRCode size={114} value={`https://fitting-pair.vercel.app/`} />
              <p>모바일로 보기</p>
              <img src={Logo} alt="logo" />
            </Style.QRImg>
          </Style.ClothWrapper>
        </S.ContentResultContainer>
      </S.Container>
    );
};

export default ResultPage;
