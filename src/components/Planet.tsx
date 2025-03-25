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
        <Wrap>
          <div className="images-div">
            {planet && (
              <PlanetImg
                src={
                  activeFilter.structure
                    ? planet.images.internal
                    : planet.images.planet
                }
                alt="planet image"
                size={planet.styles.size}
              />
            )}
            {activeFilter.surface ? (
              <img className="surface-img" src={planet?.images.geology} />
            ) : null}
          </div>
          <TextFilter>
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
            <FilterSectionTablet>
              <FilterButtonTablet
                style={{
                  backgroundColor: activeFilter.overview
                    ? planet?.styles.color
                    : "",
                  transition: "0.2s",
                }}
                color={planet?.styles.color}
                onClick={() =>
                  setActiveFilter({
                    overview: true,
                    structure: false,
                    surface: false,
                  })
                }>
                OVERVIEW
              </FilterButtonTablet>
              <FilterButtonTablet
                style={{
                  backgroundColor: activeFilter.structure
                    ? planet?.styles.color
                    : "",
                  transition: "0.2s",
                }}
                color={planet?.styles.color}
                onClick={() =>
                  setActiveFilter({
                    overview: false,
                    structure: true,
                    surface: false,
                  })
                }>
                INTERNAL STRUCTURE
              </FilterButtonTablet>
              <FilterButtonTablet
                style={{
                  backgroundColor: activeFilter.surface
                    ? planet?.styles.color
                    : "",
                  transition: "0.2s",
                }}
                color={planet?.styles.color}
                onClick={() =>
                  setActiveFilter({
                    overview: false,
                    structure: false,
                    surface: true,
                  })
                }>
                SURFACE GEOLOGY
              </FilterButtonTablet>
            </FilterSectionTablet>
          </TextFilter>
        </Wrap>
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

  @media only screen and (min-width: 48rem) {
    display: none;
  }
`;

const FilterButton = styled.button<{ isActive: boolean; color?: string }>`
  all: unset;
  color: ${(props) => (props.isActive ? "white" : "#ffffff9a")};
  font-size: 0.9rem;
  letter-spacing: 1.93px;
  padding: 2rem 0.9rem;
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

const PlanetImg = styled.img<{
  size: {
    mobile: { width: string; height: string };
    tablet: { width: string; height: string };
    desktop?: { width: string; height: string };
  };
}>`
  display: block;
  position: relative;
  width: ${({ size }) => size.mobile.width};
  height: ${({ size }) => size.mobile.height};
  margin: auto;

  @media only screen and (min-width: 48rem) {
    width: ${({ size }) => size.tablet.width};
    height: ${({ size }) => size.tablet.height};
  }

  @media only screen and (min-width: 90rem) {
    width: ${({ size }) => size.desktop?.width || size.tablet.width};
    height: ${({ size }) => size.desktop?.height || size.tablet.height};
    margin: unset;
  }
`;

const TextWrap = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  @media only screen and (min-width: 48rem) {
    text-align: left;
    max-width: 34rem;
  }

  @media only screen and (min-width: 90rem) {
    text-align: left;
    max-width: 35rem;
  }
`;

const PlanetName = styled.h2`
  color: white;
  font-size: 4rem;
  margin-top: 6.7rem;

  @media only screen and (min-width: 48rem) {
    margin: 0;
    font-size: 4.8rem;
  }

  @media only screen and (min-width: 90rem) {
    margin: unset;
    font-size: 8rem;
  }
`;

const TextContent = styled.p`
  font-size: 1.1rem;
  line-height: 2.2rem;
  color: #ffffffd5;
  font-family: "League Spartan";

  @media only screen and (min-width: 48rem) {
    margin: 0;
  }

  @media only screen and (min-width: 90rem) {
    font-size: 1.4rem;
  }
`;

const Source = styled.p`
  color: #ffffff9a;
`;

const PlanetInfoSection = styled.section`
  padding: 6.4rem 2.4rem 4.7rem;

  @media only screen and (min-width: 48rem) {
    padding: 9.4rem 3.9rem 3.6rem;
  }

  @media only screen and (min-width: 90rem) {
    padding: 9.4rem 16.5rem 5.6rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
`;

const AverageInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-top: 2.8rem;

  @media only screen and (min-width: 48rem) {
    flex-direction: row;
    justify-content: space-between;
  }

  @media only screen and (min-width: 90rem) {
    gap: 3rem;
  }
`;

const InnerWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.3rem 2.4rem;
  border: 1px solid #ffffff9a;

  @media only screen and (min-width: 48rem) {
    flex-direction: column;
    align-items: start;
    gap: 0.8rem;
  }
`;

const FilterSectionTablet = styled.div`
  display: none;

  @media only screen and (min-width: 48rem) {
    display: flex;
    flex-direction: column;
    width: 28.1rem;
    gap: 1.6rem;
  }

  @media only screen and (min-width: 48rem) {
    width: 100%;
    gap: 1.6rem;
  }
`;

const TextFilter = styled.div`
  @media only screen and (min-width: 48rem) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 13rem;
  }

  @media only screen and (min-width: 90rem) {
    flex-direction: column;
    align-items: start;
    gap: 3.9rem;
    margin: unset;
  }
`;

const Wrap = styled.div`
  @media only screen and (min-width: 90rem) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8.6rem;
  }
`;

const FilterButtonTablet = styled.button`
  width: 100%;
  border: 0.5px solid #ffffff69;
  background-color: transparent;
  color: white;
  padding: 1.2rem 2rem;
  text-align: left;
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    background-color: #d8d8d86c;
  }
`;
