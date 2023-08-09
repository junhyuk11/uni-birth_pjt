package com.ssafy.unibirth.constellation.dto;

import com.ssafy.unibirth.constellation.domain.Point;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PlanetConstellationItemDto {
    private Long constellationId;
    private String title;
    private int boardSize;
    private int[][] lineList;
    private double x;
    private double y;
    private double z;
    private String imageUrl;
    private String color;
    private boolean alreadyPined;
    private List<Point> pointList;
}
