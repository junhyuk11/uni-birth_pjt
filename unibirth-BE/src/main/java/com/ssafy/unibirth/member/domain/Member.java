package com.ssafy.unibirth.member.domain;

import com.ssafy.unibirth.common.domain.util.BaseTimeEntity;
import com.ssafy.unibirth.constellation.domain.Constellation;
import com.ssafy.unibirth.member.dto.UpdateProfileReqDto;
import com.ssafy.unibirth.zodiac.domain.Zodiac;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Member extends BaseTimeEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;
    private String nickname;
    private String password;
    private String email;

    @Enumerated(EnumType.STRING)
    private Role role = Role.USER; // USER, ADMIN, DELETED

    @ColumnDefault("0")
    private int followingCount;
    @ColumnDefault("0")
    private int followerCount;
    @ColumnDefault("0")
    private int starCount; // 작성한 별의 수

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "zordiac_id")
    private Zodiac zodiac;

    // 내가 작성한 별자리 목록
    @OneToMany(mappedBy = "member")
    private List<Constellation> constellationList = new ArrayList<>();

    @ColumnDefault("5")
    private int purchasedBoard;
    @ColumnDefault("6")
    private int purchasedPin;

    private String introduction;

    private Date birth;
    private String imageUrl;

    public Member(String nickname, String password) {
        this.nickname = nickname;
        this.password = password;
    }

    // 유저 정보(닉네임, 비밀번호) 변경
    public void updateMember(String nickname, String password) {
        this.nickname = nickname;
        this.password = password;
    }

    // 멤버 상태를 삭제로 전환
    // 멤버 자체를 데이터베이스에서 삭제해버리면 cascade된 별과 별자리까지 모두 삭제됨
    // => 상태만 삭제된 것으로 바꿔주자
    public void deleteMember() {
        this.role = Role.DELETED;
    }
    
    // 결재하면 격자판을 10칸으로 추가함
    public void plusBlock() {
        this.purchasedBoard += 5;
    }

    // 결재하면 핀할 수 있는 별자리 갯수를 6개에서 12개로 늘림
    public void plusPin() {
        this.purchasedPin += 6;
    }

    // 프로필 수정
    public void updateProfile(UpdateProfileReqDto updateProfileReqDto) {
        this.imageUrl = updateProfileReqDto.getImageUrl();
        this.introduction = updateProfileReqDto.getIntroduction();
    }

}