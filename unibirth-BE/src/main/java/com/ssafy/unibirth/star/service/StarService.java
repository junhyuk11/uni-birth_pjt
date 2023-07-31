package com.ssafy.unibirth.star.service;

import com.ssafy.unibirth.common.api.exception.CustomException;
import com.ssafy.unibirth.common.api.exception.NotFoundException;
import com.ssafy.unibirth.common.api.status.FailCode;
import com.ssafy.unibirth.constellation.domain.Constellation;
import com.ssafy.unibirth.constellation.service.ConstellationService;
import com.ssafy.unibirth.member.domain.Member;
import com.ssafy.unibirth.member.service.MemberService;
import com.ssafy.unibirth.star.domain.Brightness;
import com.ssafy.unibirth.star.domain.BrightnessId;
import com.ssafy.unibirth.star.domain.Star;
import com.ssafy.unibirth.star.dto.*;
import com.ssafy.unibirth.star.repository.BrightnessRepository;
import com.ssafy.unibirth.star.repository.StarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class StarService {
    private final StarRepository starRepository;
    private final BrightnessRepository brightnessRepository;
    private final MemberService memberService;
    private final ConstellationService constellationService;

    @Transactional
    public CreateStarResDto create(Long memberId, CreateStarReqDto dto) {
        Long constellationId = dto.getConstellationId();
        checkCompletion(constellationId);

        Member member = memberService.detailUser(memberId);
        Constellation constellation = constellationService.findConstellationById(constellationId);
        Star star = dto.toEntity(constellation, member);
        Long createdId = starRepository.save(star).getId();

        constellationService.increaseConstellationStarCount(constellationId);
        return new CreateStarResDto(createdId);
    }

    public ReadStarDto read(Long id, Long memberId) {
        Star star = findStarById(id);
        BrightnessId brightnessId = new BrightnessId(memberId, id);
        boolean alreadyLiked = brightnessRepository.existsById(brightnessId);
        return ReadStarDto.from(star, memberId, alreadyLiked);
    }

    @Transactional
    public BrightnessResDto updateBrightness(Long id, Long memberId, int likeDiff) {
        Star star = findStarById(id);
        checkLikeValidation(memberId, star, likeDiff);

        star.setBrightness(star.getBrightness() + likeDiff);
        constellationService.updateTotalBrightness(star.getConstellation(), likeDiff);
        updateBrightnessRepository(memberId, star, likeDiff);

        return new BrightnessResDto(id, star.getBrightness());
    }

    @Transactional
    public boolean updateBrightnessRepository(Long memberId, Star star, int likeDiff) {
        if(likeDiff >= 0) {
            brightnessRepository.save(new Brightness(memberService.detailUser(memberId), star));
        }
        else {
            brightnessRepository.delete(findBrightnessById(memberId, star.getId()));
        }
        return true;
    }

    @Transactional(readOnly = true)
    public List<ReadMyStarListResDto> getMyStarList(Long memberId) {
        List<Star> starList = starRepository.findAllByMemberId(memberId);
        return convertToMyStarListDto(starList);
    }

    public List<Star> getStarListByConstellationId(Long id) {
        return starRepository.findAllByConstellationId(id);
    }

    @Transactional(readOnly = true)
    public Star findStarById(Long id) {
        return starRepository.findById(id).orElseThrow(
                () -> new NotFoundException(FailCode.STAR_NOT_FOUND)
        );
    }

    @Transactional(readOnly = true)
    public Brightness findBrightnessById(Long memberId, Long starId) {
        BrightnessId brightnessId = new BrightnessId(memberId, starId);
        return brightnessRepository.findById(brightnessId).orElseThrow(
                () -> new NotFoundException(FailCode.BRIGHTNESS_NOT_FOUND)
        );
    }

    private boolean checkCompletion(Long constellationId) {
        if(constellationService.isCompletion(constellationId)) {
            throw new CustomException(FailCode.ALREADY_COMPLETED_CONSTELLATION);
        }
        return true;
    }

    private boolean checkLikeValidation(Long memberId, Star star, int diff) {
        BrightnessId id = new BrightnessId(memberId, star.getId());
        boolean alreadyLiked = brightnessRepository.existsById(id);
        if(diff >= 0 && alreadyLiked) {
            throw new CustomException(FailCode.ALREADY_LIKED_STAR);
        }
        if((diff < 0 && !alreadyLiked)) {
            throw new CustomException(FailCode.BRIGHTNESS_NOT_FOUND);
        }
        if(diff < 0 && star.getBrightness() <= 0) {
            throw new CustomException(FailCode.MINUS_STAR);
        }
        return true;
    }

    private List<ReadMyStarListResDto> convertToMyStarListDto(List<Star> starList) {
        return starList.stream()
                .map(star -> ReadMyStarListResDto.builder()
                        .starId(star.getId())
                        .constellationId(star.getConstellation().getId())
                        .createdAt(star.getCreatedAt())
                        .updatedAt(star.getUpdatedAt())
                        .title(star.getConstellation().getTitle())
                        .brightness(star.getBrightness())
                        .content(star.getContent())
                        .imageUrl(star.getImageUrl())
                        .build())
                .collect(Collectors.toList());
    }
}