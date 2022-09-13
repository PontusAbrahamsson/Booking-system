import {
  Container,
  ServiceCard,
  AddServiceCard
} from "../../styles/MinaTjansterStyle";
import WithBusinessAuth from "../../hoc/withBusinessAuth";
import Link from "next/link";

export default function MyServices() {

  return (
    <WithBusinessAuth>
      <Container>
        <ServiceCard>
          <div className="imgBox">
            <img src="https://media.istockphoto.com/photos/barber-giving-a-haircut-in-his-shop-picture-id937443868?k=20&m=937443868&s=170667a&w=0&h=NSLPTvOirsVZjf1PTFBLKOj5xzJRzW_XMeADtJdwdlg=" alt="" />
          </div>
          <div className="infoBox">
            <div className="leftInfoBox">
              <h1 className="cardTitle">Tamam fade</h1>
              <h2 className="cardLocation">Somalivägen 23, Rinkeby</h2>
              <h3 className="cardTime">Tid fr. 13:30, mån 3 maj</h3>
            </div>
            <div className="rightInfoBox">
              <a className="manageBtn">Redigera</a>
            </div>
          </div>
        </ServiceCard>
        <Link href={`/mina-tjanster/lagg-till`}>
          <AddServiceCard>
            <svg className="addNewIcon" xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M23.25 37V24.75H11v-1.5h12.25V11h1.5v12.25H37v1.5H24.75V37Z" /></svg>
          </AddServiceCard>
        </Link>
      </Container>
    </WithBusinessAuth>
  )
};