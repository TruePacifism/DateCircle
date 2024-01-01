import {
  Dispatch,
  MouseEvent,
  Ref,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./DateWheel.module.css";
import { Swiper, SwiperClass, SwiperRef, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { ReactComponent as SwitchLeftIcon } from "../image/switch-left-icon.svg";
import { ReactComponent as SwitchRightIcon } from "../image/switch-right-icon.svg";
import { ReactComponent as ArrowRightIcon } from "../image/arrow-right.svg";
import gsap, { Linear } from "gsap";
import { useMediaQuery } from "usehooks-ts";

export type infoType = {
  year: number;
  text: string;
};

export type pointType = {
  name: string;
  infos: infoType[];
};

export type preparedPointType = {
  x: number;
  y: number;
  name: string;
  number: string;
  rangeStart: number;
  rangeEnd: number;
  infos: infoType[];
};
type propsType = {
  data: pointType[];
};
const pointBorderWidth = 1;
const radius = 265 - pointBorderWidth; // радиус окружности
const smallRadius = 28;
const preparePoints = (data: pointType[]): preparedPointType[] => {
  const preparedPoints = data.map((point, idx) => {
    point.infos.sort((info1, info2) => info1.year - info2.year);
    const number = idx.toString();
    const rangeStart = point.infos[0].year;
    const rangeEnd = point.infos[point.infos.length - 1].year;
    const angle = idx * (360 / data.length) * (Math.PI / 180);
    const x = radius + radius * Math.cos(angle) - smallRadius;
    const y = radius + radius * Math.sin(angle) - smallRadius;
    return { ...point, x, y, number, rangeStart, rangeEnd };
  });
  return preparedPoints;
};
export default function DateWheel({ data }: propsType) {
  const isDesktop = useMediaQuery("screen and (min-width: 769px)");
  const swiperRef: Ref<SwiperRef> = useRef<SwiperRef>(null);
  const [preparedPoints, setPreparedPoints]: [
    preparedPointType[],
    Dispatch<SetStateAction<preparedPointType[]>>
  ] = useState(preparePoints(data));
  const [isLoadingInfos, setIsLoadingInfos]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(false);
  const [selectedPoint, setSelectedPoint]: [
    number,
    Dispatch<SetStateAction<number>>
  ] = useState(0);
  const [showingInfos, setShowingInfos]: [
    infoType[],
    Dispatch<SetStateAction<infoType[]>>
  ] = useState(preparedPoints[selectedPoint].infos);
  const [rotateValue, setRotateValue]: [
    number,
    Dispatch<SetStateAction<number>>
  ] = useState(360 / preparedPoints.length);
  const [isLeftSwipable, setIsLeftSwipable]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(false);
  const [isRightSwipable, setIsRightSwipable]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(showingInfos.length > 3);
  useEffect(() => {
    setPreparedPoints((oldPoints) => {
      const newPoints = [];
      for (let i = 0; i < oldPoints.length; i++) {
        const angle = i * (360 / oldPoints.length) * (Math.PI / 180);
        const x = radius + radius * Math.cos(angle) - smallRadius;
        const y = radius + radius * Math.sin(angle) - smallRadius;
        const number = (i + 1).toString();
        const info =
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil nobis modi non neque consequatur officiis quis deleniti, enim repellat? Eligendi dignissimos reiciendis id recusandae eveniet fugiat odit at numquam nulla.";
        newPoints.push({ ...oldPoints[i], x, y, number, info });
      }
      return newPoints;
    });
  }, [preparedPoints.length]);
  useEffect(() => {
    console.log("rotateValue", rotateValue);
    const isNegative = rotateValue <= 30;
    const diff =
      selectedPoint > preparedPoints.length - 1 / 2
        ? selectedPoint - preparedPoints.length
        : selectedPoint;
    const countedRotateValue = isNegative
      ? (360 / preparedPoints.length) * diff + 60 - 360
      : (360 / preparedPoints.length) * diff + 60;
    console.log("countedRotateValue", countedRotateValue);
    const difference = ((rotateValue % 360) - countedRotateValue) % 360;
    console.log("difference", difference);
    if (difference !== 0) {
      setRotateValue((oldRotateValue) => oldRotateValue - difference);
    }
  }, [rotateValue, preparedPoints.length, selectedPoint]);
  const rotate = useCallback(
    (diff: number) => {
      setRotateValue((oldRotateValue) => {
        let newRotateValue =
          oldRotateValue +
          (360 / preparedPoints.length / 2) *
            (diff > preparedPoints.length / 2
              ? diff - preparedPoints.length
              : diff);
        if (newRotateValue % 60 === 0) {
          console.log("yes");
        }
        return newRotateValue;
      });
    },
    [preparedPoints.length]
  );
  const hideInfos = useCallback(() => {
    setIsLoadingInfos(true);
  }, []);
  const showInfos = useCallback(() => {
    setIsLoadingInfos(false);
  }, []);
  const changeSelectedPoint = useCallback(
    (newIndex: number) => {
      hideInfos();
      setSelectedPoint((oldIndex) => {
        if (oldIndex === newIndex) {
          return oldIndex;
        }
        const diff =
          oldIndex > newIndex ? newIndex - oldIndex + 6 : newIndex - oldIndex;
        rotate(diff);
        setTimeout(() => {
          setShowingInfos(preparedPoints[newIndex].infos);
          showInfos();
        }, 500);

        return newIndex;
      });
    },
    [rotate, hideInfos, preparedPoints, showInfos]
  );
  const handlePointSelect = useCallback(
    (e: MouseEvent<HTMLLIElement, globalThis.MouseEvent>) => {
      const newIndex: number =
        Number(e.currentTarget.childNodes[0].textContent) - 1;
      changeSelectedPoint(newIndex);
    },
    [changeSelectedPoint]
  );

  const handleTurnLeft = useCallback(() => {
    changeSelectedPoint(
      selectedPoint === 0 ? preparedPoints.length - 1 : selectedPoint - 1
    );
  }, [preparedPoints.length, selectedPoint, changeSelectedPoint]);
  const handleTurnRight = useCallback(() => {
    changeSelectedPoint(
      selectedPoint === preparedPoints.length - 1 ? 0 : selectedPoint + 1
    );
  }, [preparedPoints.length, selectedPoint, changeSelectedPoint]);
  const ulRef = useRef<HTMLUListElement>(null);

  const rangeStartRef = useRef<HTMLSpanElement>(null);
  const rangeEndRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    var startValue = { d: Number(rangeStartRef.current?.textContent) };
    gsap.to(startValue, {
      duration: 1,
      d: preparedPoints[selectedPoint].rangeStart,
      ease: Linear.easeIn,
      onUpdate: () => {
        if (rangeStartRef.current) {
          rangeStartRef.current.textContent = Math.floor(
            startValue.d
          ).toString();
        }
      },
    });
    var endValue = { d: Number(rangeEndRef.current?.textContent) };
    gsap.to(endValue, {
      duration: 1,
      d: preparedPoints[selectedPoint].rangeEnd,
      ease: Linear.easeIn,
      onUpdate: () => {
        if (rangeEndRef.current) {
          rangeEndRef.current.textContent = Math.floor(endValue.d).toString();
        }
      },
    });
  }, [selectedPoint, preparedPoints]);

  const circleRef = useRef<HTMLDivElement>(null);
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Исторические даты</h1>
      <div ref={circleRef} className={styles.circleContainer}>
        {isDesktop && (
          <>
            <div className={styles.verticalLine}></div>
            <div className={styles.horizontalLine}></div>
            <ul
              className={styles.list}
              style={{
                transform: `rotate(${-rotateValue}deg)`,
              }}
              ref={ulRef}
            >
              {preparedPoints.map((point, idx) => (
                <li
                  key={idx}
                  className={`${styles.point} ${
                    selectedPoint === idx ? styles.selected : ""
                  }`}
                  style={{
                    top: `${point.y}px`,
                    left: `${point.x}px`,
                    transform: `rotate(${rotateValue}deg) ${
                      selectedPoint === idx ? "" : ""
                    }`,
                  }}
                  onClick={
                    selectedPoint === idx ? undefined : handlePointSelect
                  }
                >
                  <span className={styles.pointNumber}>{point.number}</span>
                  <span className={styles.pointName}>{point.name}</span>
                </li>
              ))}
            </ul>
          </>
        )}
        <div className={styles.dateRange}>
          <span ref={rangeStartRef} className={styles.dateRange__start}></span>
          <span ref={rangeEndRef} className={styles.dateRange__end}></span>
        </div>
      </div>
      <div className={styles.controlPanel}>
        <span className={styles.currentPoint}>{`0${selectedPoint + 1}/0${
          preparedPoints.length
        }`}</span>
        <div className={styles.controlButtonsContainer}>
          <SwitchLeftIcon
            className={styles.switchLeftIcon}
            onClick={selectedPoint === 0 ? undefined : handleTurnLeft}
            opacity={selectedPoint === 0 ? 0.5 : 1}
          />
          <SwitchRightIcon
            className={styles.switchRightIcon}
            onClick={
              selectedPoint === preparedPoints.length - 1
                ? undefined
                : handleTurnRight
            }
            opacity={selectedPoint === preparedPoints.length - 1 ? 0.5 : 1}
          />
        </div>
      </div>
      <div className={styles.swiperContainer}>
        {isDesktop && (
          <div
            className={styles.swiperLeft}
            style={{
              opacity: isLeftSwipable ? 1 : 0,
              transition: "opacity 500ms linear",
            }}
            onClick={() => {
              swiperRef.current?.swiper.slidePrev();
            }}
          >
            <ArrowRightIcon className={styles.swiperArrowLeft} />
          </div>
        )}
        <div
          style={{
            opacity: isLoadingInfos ? 0 : 1,
            transition: "opacity 250ms linear",
            width: "90%",
            height: "223px",
          }}
        >
          <Swiper
            ref={swiperRef}
            modules={isDesktop ? undefined : [Pagination]}
            pagination={{
              horizontalClass: styles.pageLine,
              bulletClass: styles.bullet,
              bulletActiveClass: styles.activeBullet,
            }}
            watchSlidesProgress
            // slideClass={styles.slide}
            slideVisibleClass={styles.visibleSlide}
            className={styles.swiper}
            slidesPerView={isDesktop ? 3 : "auto"}
            spaceBetween={25}
            grabCursor
            onActiveIndexChange={(e: SwiperClass) => {
              const leftIndex = e.activeIndex;
              if (leftIndex === 0) {
                setIsLeftSwipable(false);
              } else {
                setIsLeftSwipable(true);
              }
              console.log(leftIndex);
              console.log(showingInfos.length);

              if (leftIndex + 3 >= showingInfos.length) {
                setIsRightSwipable(false);
              } else {
                setIsRightSwipable(true);
              }
            }}
          >
            {showingInfos.map((info) => (
              <SwiperSlide style={{ width: "auto" }}>
                <div className={styles.slideContainer}>
                  <h3 className={styles.slideYear}>{info.year}</h3>
                  <p className={styles.slideText}>{info.text}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {isDesktop && (
          <div
            className={styles.swiperRight}
            style={{
              opacity: isRightSwipable ? 1 : 0,
              transition: "opacity 250ms linear",
            }}
            onClick={() => {
              swiperRef.current?.swiper.slideNext();
            }}
          >
            <ArrowRightIcon className={styles.swiperArrowRight} />
          </div>
        )}
      </div>
    </div>
  );
}
