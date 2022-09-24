import { db } from "../../firebase/db";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import {
  SingleClinic,
  AboutContainer,
  BookingSection

} from "../../styles/singleClinicStyle";
import Link from "next/link";

const SignleClinicPage = () => {
  const router = useRouter();
  const { singleClinicId } = router.query
  const [signleClinic, setSingleClinic] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [aboutUsLoadMore, setAboutUsLoadMore] = useState(false);
  console.log(signleClinic)

  useEffect(() => {
    const getSingleClinic = async () => {
      if (singleClinicId !== undefined) {
        const serviceRef = await collection(db, 'service');
        const q = query(serviceRef, where('företag.slug', '==', singleClinicId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setSingleClinic(doc.data());
          setIsLoading(false)
        });
      }
    };
    getSingleClinic();
  }, [singleClinicId]);

  const openServiceDropDown = (index) => {
    let element = document.getElementsByClassName('headServiceLi')[index];
    element.classList.toggle('toogleDropDown');

    if (element.classList.contains("toogleDropDown")) {
      const boxHeight = document.getElementsByClassName('serviceUl')[index].offsetHeight + 25
      document.getElementsByClassName('serviceUl')[index].style.height = boxHeight + 'px'
      document.getElementsByClassName('arrowIcon')[index].style.transform = 'rotate(-180deg)'
    } else {
      document.getElementsByClassName('serviceUl')[index].style.height = '0'
      document.getElementsByClassName('arrowIcon')[index].style.transform = 'rotate(0deg)'
    }
  };

  if (isLoading === true) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  return (
    <SingleClinic>
      <BookingSection>
        <span className="title">Boka tjänst</span>
        <ul className="headSserviceUl">
          {signleClinic.tjänster.map((huvudTjänst, index) => {

            return (
              <li className="headServiceLi" onClick={() => openServiceDropDown(index)}>
                <div className="flexBetween">
                  <span className="headServiceTitle" key={index}>{huvudTjänst.huvudTjänst}</span>
                  <svg className='arrowIcon' xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M12 14.7 6.7 9.4l.7-.725 4.6 4.6 4.6-4.6.7.725Z" /></svg>
                </div>
                <ul className="serviceUl">
                  {huvudTjänst.tjänster.map((tjänst, tjänstIndex) => {

                    return (
                      <li key={tjänstIndex} className="singleServiceLi">
                        <div className="ServiceFlexBetween">
                          <div className="wrapper">
                            <p className="singleTitle">{tjänst.namn} - {tjänst.utförandeTid} min</p>
                            <p className="signleUnderText">{tjänst.utförandeTid} minuter , {tjänst.kostnad} kr</p>
                          </div>
                          <button className="bookBtn">Boka</button>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </li>
            )
          })}
        </ul>
      </BookingSection>
      <AboutContainer>
        <p className="title">Om oss</p>
        {aboutUsLoadMore === false ?
          <p>{signleClinic.företag.omOss.slice(0, 200)}...</p>
          :
          <p>{signleClinic.företag.omOss}</p>
        }
        {signleClinic.företag.omOss.length > 200 &&
          <>
            {aboutUsLoadMore === false ?
              <button button className="showMoreBtn" onClick={() => setAboutUsLoadMore(true)}>Visa mer</button>
              :
              <button className="showMoreBtn" onClick={() => setAboutUsLoadMore(false)}>Visa mindre</button>
            }
          </>
        }
        <p className="title">Kontakt</p>
        <div className="flexBetween">
          <div className="wrap">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M19.425 20.45q-2.9 0-5.762-1.388-2.863-1.387-5.113-3.637-2.25-2.25-3.637-5.1-1.388-2.85-1.388-5.775 0-.45.3-.75t.75-.3h3.25q.4 0 .687.237.288.238.363.613L9.45 7.3q.05.375-.025.675-.075.3-.325.525l-2.3 2.25q1.2 2 2.837 3.625Q11.275 16 13.35 17.2l2.225-2.25q.25-.25.588-.35.337-.1.687-.05l2.775.575q.375.075.613.35.237.275.237.675v3.25q0 .45-.3.75t-.75.3ZM6.1 9.325l1.775-1.7q.05-.05.063-.113.012-.062-.013-.112L7.5 5.15q-.025-.075-.075-.113Q7.375 5 7.3 5H5.175q-.075 0-.113.037-.037.038-.037.088.075 1.025.338 2.087.262 1.063.737 2.113Zm8.65 8.575q1 .475 2.075.725 1.075.25 2.025.275.05 0 .088-.038.037-.037.037-.087v-2.1q0-.075-.037-.125-.038-.05-.113-.075l-2.1-.425q-.05-.025-.1 0l-.1.05ZM6.1 9.325Zm8.65 8.575Z" /></svg>
            {signleClinic.företag.telefonnummer}
          </div>
          <button className="callBtn">Ring</button>
        </div>
        <p className="title">Öppetider</p>
        <ul className="opentimeUl">
          {Object.values(signleClinic.öppetider).sort((a, b) => a.index - b.index).map((öppetid) => {

            return (
              <li className="timeLi" key={öppetid.index}>
                <span className="day">{öppetid.dag.slice(0, 3)}</span>
                {öppetid.dayOff === false ?
                  <span className="time">{öppetid.start} - {öppetid.end}</span>
                  :
                  <span className="time">Stängt</span>
                }

              </li>
            )
          })}
        </ul>
        <div className="flexBox">
          <svg className="infoIcon" xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M4.3 19.5q-.75 0-1.275-.525Q2.5 18.45 2.5 17.7V6.3q0-.75.525-1.275Q3.55 4.5 4.3 4.5h15.4q.75 0 1.275.525.525.525.525 1.275v11.4q0 .75-.525 1.275-.525.525-1.275.525Zm7.7-6.95-8-5.1V17.7q0 .125.088.213.087.087.212.087h15.4q.125 0 .213-.087.087-.088.087-.213V7.45ZM12 11l7.85-5H4.15ZM4 7.45V6v11.7q0 .125.088.213.087.087.212.087H4v-.3Z" /></svg>
          <span className="infoText">{signleClinic.företag.email}</span>
        </div>
        <div className="flexBox">
          <svg className="infoIcon" xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M12 21.5q-1.95 0-3.688-.75-1.737-.75-3.025-2.038Q4 17.425 3.25 15.688 2.5 13.95 2.5 12q0-1.975.75-3.7t2.037-3.013Q6.575 4 8.312 3.25 10.05 2.5 12 2.5q1.975 0 3.7.75t3.012 2.037Q20 6.575 20.75 8.3q.75 1.725.75 3.7 0 1.95-.75 3.688-.75 1.737-2.038 3.024Q17.425 20 15.7 20.75q-1.725.75-3.7.75Zm0-1.525q.775-1 1.288-2.037.512-1.038.862-2.263h-4.3q.35 1.25.863 2.287Q11.225 19 12 19.975Zm-1.925-.275q-.575-.825-1.037-1.875-.463-1.05-.713-2.15h-3.4q.8 1.55 2.125 2.613 1.325 1.062 3.025 1.412Zm3.85 0q1.7-.35 3.025-1.412 1.325-1.063 2.125-2.613h-3.4q-.3 1.1-.75 2.162-.45 1.063-1 1.863ZM4.3 14.175h3.725q-.1-.55-.15-1.088-.05-.537-.05-1.087 0-.55.05-1.088.05-.537.15-1.087H4.3q-.15.5-.225 1.05Q4 11.425 4 12t.075 1.125q.075.55.225 1.05Zm5.225 0h4.95q.1-.55.15-1.075.05-.525.05-1.1 0-.575-.05-1.1-.05-.525-.15-1.075h-4.95q-.1.55-.15 1.075-.05.525-.05 1.1 0 .575.05 1.1.05.525.15 1.075Zm6.45 0H19.7q.15-.5.225-1.05Q20 12.575 20 12t-.075-1.125q-.075-.55-.225-1.05h-3.725q.1.55.15 1.087.05.538.05 1.088t-.05 1.087q-.05.538-.15 1.088Zm-.3-5.85h3.4q-.8-1.575-2.112-2.613-1.313-1.037-3.038-1.437.575.875 1.025 1.912.45 1.038.725 2.138Zm-5.825 0h4.3q-.35-1.25-.887-2.313Q12.725 4.95 12 4.025q-.725.925-1.262 1.987-.538 1.063-.888 2.313Zm-4.925 0h3.4q.275-1.1.725-2.138.45-1.037 1.025-1.912-1.75.4-3.05 1.437-1.3 1.038-2.1 2.613Z" /></svg>
          <Link href={signleClinic.företag.hemsida}>
            <a className="infoText">{signleClinic.företag.hemsida}</a>
          </Link>
        </div>
      </AboutContainer>
    </SingleClinic >
  )
}

export default SignleClinicPage;