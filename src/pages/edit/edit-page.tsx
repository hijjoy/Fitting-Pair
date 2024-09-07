import { Button, MoblieIcon, MypageBox } from "@/components";
import Icon from "@/assets/images/icon.png";
import Phone from "@/assets/images/phone.png";
import Logo from "@/assets/images/Logo-black.png";
import Ruler from "@/assets/images/ruler.png";
import useGetUserInfo from "@/hooks/queries/auth/useGetUserInfo";
import { MdMale, MdFemale } from "react-icons/md";
import useForm from "@/hooks/useForm";
import useEditUserInfo from "@/hooks/queries/auth/useEditUserInfo";

import * as S from "../modify/modify-page.style";
import * as Style from "./edit-page.style";

const EditPage = () => {
  const { data } = useGetUserInfo();

  const { mutate } = useEditUserInfo(data?.id as number);

  const editForm = useForm({
    initialValue: {
      userName: data?.userName ?? "",
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (data) {
      mutate({ userName: editForm.values.userName });
    }
  };

  if (data)
    return (
      <S.Container>
        <MoblieIcon text="FITTING PAIR" />
        <h1>EDIT</h1>
        <Style.InfoForm onSubmit={handleSubmit}>
          <MypageBox
            {...editForm.getTextInputProps("userName")}
            edit={true}
            label="닉네임"
            text={data.userName}
            icon={Icon}
            validateText="5자 이내로 입력해주세요."
          />
          <MypageBox
            label="휴대폰 번호"
            text={data.phoneNumber}
            icon={Phone}
            noClick={true}
          />
          <S.SEXBox $male={data.gender === "male"}>
            <p>성별</p>
            <S.ButtonBox>
              <button className="male">
                <MdMale />
              </button>
              <hr />
              <button className="female">
                <MdFemale />
              </button>
            </S.ButtonBox>
          </S.SEXBox>
          <MypageBox
            label={"키(신장)"}
            text={data.height}
            icon={Ruler}
            noClick={true}
          />
          <Button text="완료" />
          <Button text="회원탈퇴" type="button" styleType="noBackground" />
        </Style.InfoForm>
        <S.BlackLogo src={Logo} />
      </S.Container>
    );
};

export default EditPage;