import React, { useState } from "react";
import Button2 from "../../../common/atoms/Button2";
import Header1 from "../../../common/blocks/Header1";
import { useNavigation } from "../../../hooks/useNavigation";
import Button1 from "../../../common/atoms/Button1";
import ListSectionStar from "../blocks/ListSectionStar";
import { useSetRecoilState } from "recoil";
import { backgroundflagState } from "../../../recoil/atoms";
import LeftArrow from "../../../assets/icons/js/leftArrow";
import InviteFollowStar from "../../Star/blocks/InviteFollowStar";

const DetailConstellation = () => {
  const backgroundflag = useSetRecoilState(backgroundflagState);
  backgroundflag(false);
  const { navigateToBack, navigateToRegisterStar } = useNavigation();
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const buttonsHeader = [
    {
      component: Button2,
      onClick: navigateToBack,
      icon: <LeftArrow />,
    },
  ];

  return (
    <div>
      <div className="absolute z-50 max-w-screen-sm">
        <Header1 buttons={buttonsHeader} />
      </div>
      <ListSectionStar className="relative left-0 top-0 z-0 h-full w-full" />
      <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2">
        <footer className="mt-16 flex flex-row items-center justify-between space-x-8">
          <Button1
            className="w-36"
            value="참여하기"
            onClick={navigateToRegisterStar}
          />
          <Button1
            className="w-36"
            value="별자리 초대하기"
            onClick={toggleModal}
          />
          {showModal && (
            <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-40">
              <div className="max-h-2/4 overflow-y-auto rounded-lg bg-white">
                <button
                  onClick={toggleModal}
                  className="float-right p-2 hover:bg-gray-200"
                >
                  X
                </button>
                <InviteFollowStar />
              </div>
            </div>
          )}
        </footer>
      </div>
    </div>
  );
};

export default DetailConstellation;
