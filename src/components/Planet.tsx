import styled from "styled-components";
import data from "../data.json";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function Planet() {
  const [activeFilter, setActiveFilter] = useState({
    overview: true,
    structure: false,
    surface: false,
  });

  const { planetName } = useParams();

  const planet = data.find((obj) => obj.name === planetName);

  return (
    <main>
      <FilterSection>
        <FilterButton
          isActive={activeFilter.overview}
          color={planet?.styles.color}
          onClick={() =>
            setActiveFilter({
              overview: true,
              structure: false,
              surface: false,
            })
          }>
          OVERVIEW
        </FilterButton>
        <FilterButton
          isActive={activeFilter.structure}
          color={planet?.styles.color}
          onClick={() =>
            setActiveFilter({
              overview: false,
              structure: true,
              surface: false,
            })
          }>
          STRUCTURE
        </FilterButton>
        <FilterButton
          isActive={activeFilter.surface}
          color={planet?.styles.color}
          onClick={() =>
            setActiveFilter({
              overview: false,
              structure: false,
              surface: true,
            })
          }>
          SURFACE
        </FilterButton>
      </FilterSection>
      <PlanetInfoSection>
        {planet && (
          <PlanetImg
            src={planet.images.planet}
            alt="planet image"
            width={planet.styles.size.mobile.width}
            height={planet.styles.size.mobile.height}
          />
        )}
        <TextWrap>
          <PlanetName>{planet?.name}</PlanetName>
          <TextContent>
            {activeFilter.overview
              ? planet?.overview.content
              : activeFilter.structure
              ? planet?.structure.content
              : planet?.geology.content}
          </TextContent>
          <Source>
            Source:{" "}
            <a
              style={{ color: "#ffffffce" }}
              href={
                activeFilter.overview
                  ? planet?.overview.source
                  : activeFilter.structure
                  ? planet?.structure.source
                  : planet?.geology.source
              }>
              Wikipedia
            </a>
          </Source>
        </TextWrap>
        <AverageInfo>
          <InnerWrap>
            <span className="inner-info-title">ROTATION TIME</span>
            <span className="inner-info">{planet?.rotation}</span>
          </InnerWrap>
          <InnerWrap>
            <span className="inner-info-title">REVOLUTION TIME</span>
            <span className="inner-info">{planet?.revolution}</span>
          </InnerWrap>
          <InnerWrap>
            <span className="inner-info-title">RADIUS</span>
            <span className="inner-info">{planet?.radius}</span>
          </InnerWrap>
          <InnerWrap>
            <span className="inner-info-title">AVERAGE TEMP.</span>
            <span className="inner-info">{planet?.temperature}</span>
          </InnerWrap>
        </AverageInfo>
      </PlanetInfoSection>
    </main>
  );
}

const FilterSection = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #ffffff51;
  padding: 0 2.4rem;
  border-bottom: 1px solid #ffffff51;
`;

const FilterButton = styled.button<{ isActive: boolean; color?: string }>`
  all: unset;
  color: ${(props) => (props.isActive ? "white" : "#ffffff9a")};
  font-size: 0.9rem;
  letter-spacing: 1.93px;
  padding: 2rem 0;
  cursor: pointer;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${(props) => (props.isActive ? "100%" : "0")};
    height: 4px;
    background-color: ${(props) => props.color};
    transition: width 0.3s ease-in-out;
  }
`;

const PlanetImg = styled.img`
  display: block;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: auto;
`;

const TextWrap = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const PlanetName = styled.h2`
  color: white;
  font-size: 4rem;
  margin-top: 6.7rem;
`;

const TextContent = styled.p`
  font-size: 1.1rem;
  line-height: 2.2rem;
  color: #ffffffd5;
  font-family: "League Spartan";
`;

const Source = styled.p`
  color: #ffffff9a;
`;

const PlanetInfoSection = styled.section`
  padding: 6.4rem 2.4rem 4.7rem;
`;

const AverageInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-top: 2.8rem;
`;

const InnerWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.3rem 2.4rem;
  border: 1px solid #ffffff9a;
`;
