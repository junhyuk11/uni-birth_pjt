package com.ssafy.unibirth.star.dto;

import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReadStarListResDto {
    private Long starId;
    private Long memberId;
    private LocalDateTime createdAt;
    private String nickname;
    private String content;
    private int brightness;
    private String imageUrl;
}