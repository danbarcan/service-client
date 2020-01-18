import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./AppFooter.css";
import { Icon, Button } from "antd";
import logoWhite from '../img/LogoWhite.ro.png';
import logoCircle from '../img/Logo-circle-ro.png'
import { Modal } from "react-bootstrap";


// const Header = Layout.Header;

class AppFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      termeniShow: false,
      confidentialityShow: false
    }
    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  handleMenuClick({ key }) {
    if (key === "logout") {
      this.props.onLogout();
    }
  }
  openTermeni() {
    this.setState({
      termeniShow: true,
    })
  }

  openConfidentiality() {
    this.setState({
      confidentialityShow: true,
    })
  }

  render() {



    return (

      <footer>
        <div className="footer-container">
          <div className="footerLogo">
            <img className="hidden" src={logoCircle} alt="logo circle"></img>
            <img src={logoWhite} alt="Smart Service Logo White"></img>
            <div className="footer-popups">
              <Button className="popupLink" onClick={() => this.setState({ show: false, termeniShow: true, confidentialityShow: false })}>Termeni si conditii</Button><br></br>
              <Button className="popupLink" onClick={() => this.setState({ show: false, termeniShow: false, confidentialityShow: true })}>Prelucrarea datelor cu caracter personal</Button>
            </div>
            <Link to="/">&#169; 2018 DDW&S</Link>
          </div>
          <div className="footer-social">
            <h3> Ne gasesti si aici:</h3>
            <Icon type="mail" href="http://google.com" />
            <Icon type="phone" />
            <Icon type="facebook" />
            <Icon type="instagram" />
          </div>
        </div>


        <Modal size="lg" show={this.state.confidentialityShow} onHide={() => this.setState({ show: false, termeniShow: false, confidentialityShow: false })}>
          <Modal.Header closeButton>
            <h3> Cu ce te putem ajuta ?</h3>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Politicile de protecție și de confidențialitate Rădăcini Grup* în conformitate cu Regulamentul General de Protecție a Datelor nr. 679/2016 (GDPR) aplicabil în Uniunea Europeana.</strong></p>
            <p>Societățile ce fac parte din Rădăcini Grup*, denumite individual în cele ce urmează Operatorul procesează datele personale ale clienților și partenerilor de afaceri prezenți, trecuți și potențiali, ca parte a desfășurării activității economice de zi cu zi.</p>
            <p>Operatorul procesează datele personale ale clienților și partenerilor de afaceri prezenți, trecuți și potențiali, ca parte a desfășurării activității economice de zi de zi.</p>
            <p>Operatorul poate deține informații despre dvs, pe care ni le-ati oferit și prelucrează datele dvs. personale în concordanta cu Regulamentul General de Protecție a Datelor nr. 679/2016 (GDPR) aplicabil în Uniunea Europeana începând cu data de 25.05.2018.</p>
            <p>Ținând cont de prevederile acestui Regulament Operatorul prelucrează datele dvs. personale, de aceea Operatorul stabilește scopul și necesitatea colectării și procesării datelor dvs. personale, procesarea datelor personale inseamnand orice operațiune manuala sau automata (când vizitați site-ul nostru spre exemplu) de preluare/colectare, înregistrare, păstrare în baza de date, adaptare, modificare, consultare, utilizare, distribuire , rectificare sau ștergere.</p>
            <p>&nbsp;</p>
            <p><strong>1. Scopul și temeiul legal de colectare și prelucrare a datelor</strong></p>
            <p>Operatorul procesează datele clienților sai persoane fizice sau persoane juridice prin reprezentanții sai și ai partenerilor (furnizori, producători) pentru desfășurarea următoarelor activități:</p>
            <ul>
              <li>Servicii clienți: de exemplu, invitații la evenimente, informații despre actualizări (tehnice) referitoare la autovehiculul tău sau orice servicii pentru acesta, notificări de termene pentru lucrări de întreținere / revizie / service sau asistență în caz de pană, Drive test.</li>
              <li>Informații clienți: date de contact, de exemplu, pentru comunicări despre autovehicule noi și rulate, oferte de finanțare și leasing, servicii dealeri, oferte de revizie și service, încetarea unui contract de creditare sau leasing sau măsuri de îmbunătățirea calității pentru autovehiculul tău.</li>
              <li>Publicitate: publicitate individualizată sau personalizată pentru oferte, produse și servicii.</li>
              <li>Sondaje privind satisfacția clienților: contactare după achiziție / serviciu, de exemplu, pe tema satisfacției față de autovehicul sau serviciile furnizate de Operator.</li>
              <li>Servicii adiacente: de exemplu, înmatriculări auto, închiriere auto, intermediere servicii finanțare.</li>
              <li>Obligații legale: de exemplu, colectarea datelor contractuale pe facturi, transmiterea documentelor către RAR.</li>
              <li>Asigurarea securității angajaților și clienților noștri: de exemplu, monitarizam video activitatea din și în jurul service-urilor, showroom-urilor și altor spatii, spre exemplu birouri.</li>
              <li>Înregistrarea informațiilor despre dumneavoastră în vederea alocării sau oferirii recompenselor, reducerilor și a altor beneficii, precum și pentru satisfacerea altor cereri sau cerințe pe care le aveți în legătura cu programele de recompensare a clienților și alte programe similare.</li>
              <li>Soluționarea cererilor, întrebărilor sau a reclamațiilor făcute.</li>
            </ul>
            <p>Vă rugăm să rețineți că Operatorul colectează și procesează doar acele informații/date personale care sunt absolut necesare a fi colectate și procesate în scopul desfășurării activității în condiții cat mai bune în scopul de a veni în întâmpinarea cerințelor clienților și a oferi servicii cât mai calitative .</p>
            <p><strong>Prelucrarea de categorii speciale de date cu caracter personal</strong></p>
            <p>Conform Regulamentului GDPR, privind prelucrarea de date de personal speciale, Operatorul nu colectează și nu prelucrează datele care se refera la: originea rasială sau etnică, opiniile politice, confesiunea religioasă sau convingerile filozofice, apartenenţa la sindicate, date genetice, date biometrice pentru identificarea unică a unei persoane fizice, date privind sănătatea , viaţa sexuală sau orientarea sexuală ale unei persoane fizice.</p>
            <p>Temeiul legal al colectării este art. 6 din Regulamentul General de Protecție a Datelor nr. 679/2016 (GDPR).</p>
            <p>&nbsp;</p>
            <p><strong>2. Categoriile de date personale pe care le colectam</strong></p>
            <p>Datele cu caracter personal în asociere cu datele contractuale aferente, datele legate de autovehicul, datele tehnice despre piese și accesorii sau datele despre service și atelierul de service pentru marketing personalizat și cercetare de piață, de exemplu (numărul de identificare al autovehiculului, kilometraj, revizii / lucrări de service și datele acestora etc.).</p>
            <p>Datele dvs. de identificare (nume, prenume, domiciliul, locul de munca, număr telefon personal, adresa de email, număr/serie document de identitate, codul numeric personal, sexul, datele bancare.</p>
            <p>Datele de identificare ale automobilului dvs. marca, model, culoare, km.parcursi, serie șasiu, ITP, frecventa vizitării service-urilor noastre, problemele înregistrate/rezolvate la autoturismul dvs., nr. facturilor emise, modalitatea de plata.</p>
            <p>Imagini video – sediile noastre (showroom, service, curte, anexe, etc.) sunt dotate cu echipamente de înregistrări video. Aceste imagini sunt stocate și păstrate pe o perioada de pana la 6 luni.</p>
            <p>Imagini foto – se refera doar la angajații Operatorului.</p>
            <p>Statutul familial, loc de munca, venituri realizate, împrumuturi/ipoteci deținute atât pentru dvs. ca și client cat și pentru soț/soție în cazul în care se solicita achiziția unui autoturism în leasing sau în rate.</p>
            <p>În general, datele personale pe care le deținem sunt sau au fost oferite de către clienți atunci când s-au prezentat la sediile noastre, când au vizitat site-ul nostru și și-au lăsat datele personale pentru a fi contactați, sau când au cerut oferte prin telefon sau email.</p>
            <p>&nbsp;</p>
            <p><strong>3. Distribuirea datelor personale</strong></p>
            <p>Operatorul distribuie datele dvs. personale numai acelor categorii de angajați (împuterniciți) și colaboratori a căror activitate impune accesul la datele dvs., enumerate exemplificativ după cum urmează:</p>
            <p>Serviciul IT</p>
            <p>Colaboratori IT</p>
            <p>Departamentul contabilitate / financiar</p>
            <p>Departamentul resurse umane</p>
            <p>Departamentul relații clienți și marketing</p>
            <p>Departamentul juridic</p>
            <p>Parteneri contractuali, inclusiv furnizori de bunuri și servicii /societăți contractate să presteze servicii pentru sau în numele nostru</p>
            <p>Parteneri sau agenți implicați în livrarea produselor și serviciilor pe care le-ati comandat sau utilizat</p>
            <p>Organizații partenere pe care le-am ales cu atenție pentru a vă putea contacta în legătură cu produsele și serviciile lor</p>
            <p>Terțe părți pentru promoții comune cu acea terță parte. Acestea vor răspunde pentru conformarea lor cu legile aplicabile privind protecția datelor</p>
            <p>O terță parte sau un organ, atunci când dezvăluirea respectivă este necesară pentru îndeplinirea oricărei legi aplicabile sau a altei cerințe legale sau de reglementare</p>
            <p>Agenții de colectare a datoriilor sau alte organizații de recuperare a datoriilor</p>
            <p>Agenții de aplicare a legii, organe guvernamentale, organizații de reglementare, instanțe sau alte autorități publice dacă avem această obligație legală sau suntem autorizați prin lege</p>
            <p>O lista detaliata cu partenerii se poate consulta <a href="https://radacini.ro/wp-content/uploads/2018/09/lista-parteneri-date-confidentiale.pdf">aici</a></p>
            <p>&nbsp;</p>
            <p><strong>4. Transferul de date într-o alta țară</strong></p>
            <p>Operatorul nu efectuează toate prelucrările datelor cu caracter personal în regim propriu, ci beneficiază de sprijin de la parteneri profesionali pentru prelucrarea datelor în scopul executării unui contract și a obligațiilor ce deriva din acesta, ca de exemplu producători, diverse agenții de marketing și societăți de sondare a opiniei, în scopurile menționate în prezenta politica.</p>
            <p>Partenerii sunt atent selectați și se obliga sa asigure, prin măsuri tehnice și organizatorice adecvate, prelucrarea datelor dumneavoastră conform prevederilor legale în vigoare privind protecția datelor și cu respectarea drepturilor dumneavoastră. Partenerilor le este interzis să utilizeze datele cu caracter personal primite pentru scopuri proprii sau comerciale sau să le transmită terților.</p>
            <p>&nbsp;</p>
            <p><strong>5. Păstrarea datelor</strong></p>
            <p>Operatorul păstrează datele dumneavoastră atâta timp cat ne indica clientul prin declarația de consimțământ sau atâta timp cat acesta rămâne în contact cu noi, prin aceasta însemnând vizite cu o anumita regularitate în service-urile, showroom-urile noastre (Spre exemplu odată pe an)</p>
            <p>Operatorul păstrează datele dumneavoastră necesare pe o durata echivalenta pana la expirarea obligațiilor (de ex, ieșirea din garanție a auto, încetare contract etc.) sau durata medie de utilizare a produsului achiziționat și conform cu termenele de arhivare restul fiind păstrate astfel:</p>
            <p>Pe o perioada de 3 ani de la ultima dumneavoastră vizita în showroom- uri sau service-urile Operatorului</p>
            <p>Va rugam sa rețineți ca anumite date sunt păstrate pe o perioada conforma cu legislația romana.</p>
            <p>&nbsp;</p>
            <p><strong>6. Drepturile dvs. privind procesarea datelor personale</strong></p>
            <p>Dreptul de a ști ce date personale va sunt procesate.</p>
            <p>Dreptul de a primi datele cu caracter personal într-un format structurat, utilizat în mod curent și care poate fi citit automat.</p>
            <p>Dreptul de a va rectifica datele.</p>
            <p>Dreptul de a fi uitat (ștergerea datelor cu caracter personal).</p>
            <p>Dreptul de a va retrage consimțământul în orice moment.</p>
            <p>Dreptul la restricționarea prelucrării.</p>
            <p>Dreptul de a va opune prelucrării.</p>
            <p>Dreptul de a nu fi evaluat pe baza unei prelucrări automate.</p>
            <p>&nbsp;</p>
            <p><strong>Dreptul de a ști ce date personale va sunt procesate/Dreptul de acces</strong></p>
            <p>Aveți dreptul de a solicita o copie a datelor cu caracter personal pe care le deține Operatorul în legătură cu dvs., prin posta la Rădăcini Grup, B-dul Iuliu Maniu nr. 246, sector 6 București, dep. Relații Clienți – GDPR sau prin email (gdpr@radacini-grup.ro) pentru a primi în format electronic toate datele dvs. deținute de Operator.</p>
            <p><strong>Dreptul de a rectifica datele</strong></p>
            <p>Aveți dreptul de a rectifica datele deținute în legătură cu dvs, dacă acestea nu sunt corecte. Dacă datele pe care le deținem trebuie actualizate sau în cazul în care considerați că acestea pot fi incorecte, va puteți adresa Operatorului la gdpr@radacini-grup.ro sau prin posta la Rădăcini Grup, B-dul Iuliu Maniu nr. 246, sector 6 București dep. Relații Clienți – GDPR</p>
            <p>Nu se pot face rectificări asupra datelor privind produsele achiziționate/închiriate, valoarea facturilor, vizitele în showroom sau service sau altele care ar contraveni legilor.</p>
            <p><strong>Dreptul de a fi uitat – de a fi șters din baza de date</strong></p>
            <p>Operatorul urmărește să prelucreze și să păstreze datele doar atât timp cât acest lucru este necesar. În anumite circumstanțe, aveți dreptul de a ne solicita să ștergem datele tale cu caracter personal pe care le deținem.</p>
            <p>În cazul în care considerați că păstrăm datele mai mult decât este necesar, puteți sa va adresați Operatorului la gdpr@radacini-grup.ro sau prin posta la Rădăcini Grup, B-dul Iuliu Maniu nr. 246, sector 6 București dep. Relații Clienți – GDPR. Dacă perioada cuprinsa în consimțământ a trecut, este posibil să avem în continuare temeiuri legale pentru prelucrarea datelor dumneavoastră cu caracter personal.</p>
            <p>Puteți solicita ștergerea datelor personale în scris prin scrisoare sau email Operatorului la gdpr@radacini-grup.ro sau prin posta la Rădăcini Grup, B-dul Iuliu Maniu nr. 246, sector 6 București dep. Relații Clienți – GDPR.</p>
            <p>Solicitarea dumneavoastră trebuie trimisa și la producătorul produsului dvs. în cazul în care acesta a fost achiziționat de la noi (ex. Opel, Suzuki, Mazda, Citroen, Peugeot, Honda).</p>
            <p>Acesta se va asigura ca în o luna de zile solicitarea clientului va fi îndeplinită și clientul a fost șters din toate aplicațiile. Termenul poate fi extins la 2 luni cu informarea în prealabil a clientului.</p>
            <p>Nu se vor șterge datele personale ale clienților care au datorii către firma sau către un partener direct (ex.firma de leasing financiar).</p>
            <p>Nu se vor șterge acele date care trebuiesc păstrate ca urmare a dispozițiilor legale (facturi, contracte etc).</p>
            <p><strong>Dreptul de retragere a consimțământului</strong></p>
            <p>Aveți dreptul în orice moment sa cereți retragerea consimțământului de comunicare.</p>
            <p>Retragerea consimțământului se va face doar în mod scris prin transmiterea cererii Operatorului la gdpr@radacini-grup.ro sau prin posta la Rădăcini Grup, B-dul Iuliu Maniu nr. 246, sector 6 București dep. Relații Clienți – GDPR.</p>
            <p><strong>Dreptul la portabilitatea datelor</strong></p>
            <p>Aveți dreptul de a primi datele cu caracter personal care va privesc și pe care le-ati furnizat operatorului într-un format structurat, utilizat în mod curent şi care poate fi citit automat şi aveți dreptul de a cere transmiterea acestor date altui operator, dacă ele au fost prelucrate pe baza de consimțământ și prelucrarea se face prin mijloace automate</p>
            <p><strong>Dreptul de restricționare la utilizarea datelor cu caracter personal</strong></p>
            <p>În anumite circumstanțe, aveți dreptul de a cere restricționarea prelucrării de către Operator a datelor dumneavoastră cu caracter personal în cazurile prevazute la art 18 din Regulament.</p>
            <p><strong>Dreptul de opoziție la prelucrarea datelor cu caracter personal</strong></p>
            <p>În anumite circumstanțe, aveți dreptul de a va opune prelucrării de către a datelor tale cu caracter personal în cazurile și în condițiile prevazute la art. 21 din Regulament.</p>
            <p><strong>Dreptul de a face o reclamație</strong></p>
            <p>Este dreptul dumneavoastră de a face o reclamație în cazul în care considerați ca aveți dubii în ceea ce privește modul cum sunt procesate și securizate datele dumneavoastră personale. Dacă doriți să ne contactați în legătură cu oricare dintre drepturile dvs sau să faceți o plângere în legătură cu modul în care utilizăm datele cu caracter personal, va rugăm să contactați echipa noastră la gdpr@radacini-grup.ro sau prin posta la Rădăcini Grup, B-dul Iuliu Maniu nr. 246, sector 6 București dep. Relații Clienți – GDPR</p>
            <p>Vom face toate eforturile pentru a ajuta, dar dacă aveți în continuare nemulțumiri, puteți contacta Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal – datele de contact se găsesc la adresa www.dataprotection.ro</p>
            <p><strong>Crearea de profiluri</strong></p>
            <p>Operatorul nu folosește de obicei datele colectate și procesate pentru întocmirea de profiluri. În unele situații va fi necesar să întocmim profiluri și segmentari în scopuri de marketing.</p>
            <p><strong>Dreptul de a nu fi evaluat pe baza unei evaluări automate</strong></p>
            <p>Operatorul respecta dreptul tuturor persoanelor care ne-au încredințat datele lor personale de a nu fi evaluate în baza unei prelucrări automate.</p>
            <p>&nbsp;</p>
            <p><strong>7. Supravegherea video</strong></p>
            <p>Operatorul are implementat un sistem video de supraveghere a locațiilor sale (service-uri, showroom-uri, birouri și spatiile înconjurătoare acestora) pentru a asigura siguranța personalului angajat dar și al clienților și a altor persoane aflate pe teritoriile ce aparțin grupului.</p>
            <p>Zonele acoperite de camerele video aflate în clădirile și terenurile aparținând Operatorului sunt semnalizate în mod specific prin bannere, indicatoare specifice.</p>
            <p>Prelucrarea datelor cu caracter personal prin intermediul sistemelor de supraveghere video se efectuează prin intermediul sistemelor de supraveghere video care prelucrează datele cu caracter personal, respectiv imaginea și alte informații ce permit identificarea persoanelor vizate.</p>
            <p>Scopul prelucrării datelor personale consta în: monitorizarea/securitatea persoanelor, spatiilor și/sau bunurilor private, prevenirea și combaterea infracțiunilor, îndeplinirea obligațiilor legale și realizarea intereselor legitime. Informațiile înregistrate sunt destinate utilizării de către Operator și pot fi comunicate numai următorilor destinatari: persoana vizata, reprezentanții legali/împuterniciții persoanei vizate, reprezentanții autorizați ai Operatorului, organele de urmărire/cercetare penala, instante judecătorești, în conformitate cu prevederile legislației interne și comunitare aplicabile activității desfășurate de către Operator. Termenul de păstrare a datelor înregistrate este conform legislației în vigoare.</p>
            <p>Rețineți că drepturile dumneavoastră menționate mai sus sunt restricționate prin lege și este posibil să trebuiască respectate de noi doar în anumite condiții.</p>
            <p>&nbsp;</p>
            <p><strong>8. Puncte de contact</strong></p>
            <p>În cazul în care doriți sa va exercitați unul sau mai multe drepturi ale dumneavoastră enumerate la punctul 6 sau doriți sa aflați mai multe informații referitoare la colectarea și procesarea și protejarea datelor dumneavoastră va rog sa contactați Operatorul prin Ofițerul de Date Personal numit conform Regulamentului GDPR.</p>
            <p>Adresa: B-dul Iuliu Maniu Nr. 246, sector 6, București, dep. Relații Clienți – GDPR.</p>
            <p>Adresa de email gdpr@radacini-grup.ro</p>
            <p>* Radacini Motors SRL, Radacini Auto Motor SRL, Arian Motors SRL, Radacini SRL, Radacini Motors Brasov SRL, Darius Motors SRL, Irmex SA, Radacini Auto Trading SRL, Radacini Equipment SRL, Radacini Diesel Center SRL, Interlease Operational SRL, Radacini Leasing IFN SA, Grupul de formare profesionala Master SRL, Master SA, Utrec SA, Irmex Trading SRL, Rally BM Com SRL, Sama Service Team SRL, Sama Service Grup SRL.</p>
          </Modal.Body>
        </Modal>

        {/* Modal Termeni si conditii */}
        <Modal size="xl" show={this.state.termeniShow} onHide={() => this.setState({ show: false, termeniShow: false, confidentialityShow: false })}>
          <Modal.Header closeButton>
            <h3> Termeni si conditii </h3>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-lg border border-light p-5">
                <p>Site-ul (numit in continuare “site”) este administrat de DD Web & Software Solutions SRL.</p>
                <p>&nbsp;</p>
                <p>1. <strong>Drepturi de proprietate intelectuala</strong></p>
                <p>Toate materialele integrate in acest site sunt proprietatea intelectuala a Smart Service sau a partenerilor sai. Aceste materiale nu pot fi copiate sau reproduse, exceptand perioada de care este nevoie sa fie vizualizate on-line. Totusi, paginile complete ale site-ului pot fi tiparite daca sunt destinate a fi folosite in scop strict personal.<br />
                  Fara a trece cu vederea aplicabilitatea generala a celor mentionate anterior, Smart Service va poate oferi ocazional oportunitatea de a descarca imagini de background, screen saver sau alte programe utilitare din site. Aceste materiale descarcate cad sub incidenta Termenilor si Conditiilor de Descarcare Smart Service.</p>
                <p>2. <strong>Plasarea de link-uri spre site</strong><br />
                  Daca doriti sa plasati un link spre site, acesta trebuie sa fie facut catre pagina</p>
                <p>3. <strong>Corectitudinea informatiilor</strong><br />
                  Informatiile continute de acest site sunt cu scop informativ, sunt adresate clientilor Smart Service si nu se aplica altor jurisdictii. Smart Service nu-si asuma responsabilitatea pentru acuratetea acestora dar va face tot posibilul pentru ca datele continute de acest site sa fie cat mai corecte si mai actuale. De asemenea, Smart Service isi rezerva dreptul de a modifica specificatiile produselor sau serviciilor descrise pe acest site in orice moment, fara nicio notificare prealabila.</p>
                <p>4. <strong>Protectia datelor personale</strong><br />
                  Smart Service va procesa datele furnizate de dumneavoastra cu maxima confidentialitate, in conformitate cu legile aflate in vigoare. Datele dumneavoastra vor fi folosite in scopul imbunatatirii produselor si serviciilor noastre astfel incat sa venim in intampinarea nevoilor clientilor nostri si pentru a va furniza noutati despre produsele si serviciile oferite de noi. Informatiile pot fi folosite doar de catre Smart Service si de catre filialele, agentiile si dealerii sai si nu vor fi vandute nimanui. In functie de datele pe care le furnizati veti fi contactati la telefon, prin posta sau prin e-mail.</p>
                <p>In conformitate cu legea 677/2001 pentru protectia persoanelor cu privire la prelucrarea datelor cu caracter personal si libera circulatie a acestor date, aveti urmatoarele drepturi privind colectarea si prelucrarea datelor personale: dreptul de interventie asupra datelor (art.14), dreptul de informare (art.12), de acces la date (art.13), de opozitie (art.15), de a va adresa justitiei (art.18). Aceste drepturi pot fi exercitate in mod gratuit prin transmiterea unei cereri scrise datate si semnate la adresa: Smart Service Motors CP. 28. Bucuresti.</p>
                <p>In unele cazuri este posibil sa colectam informatii cu caracter non-personal despre dumneavoastra. Exemple de informatii de acest tip sunt: tipul de browser folosit, sistemul de operare al calculatorului folosit si numele domeniului website-ului de unde a fost facute conexiunea la site-ul nostru sau ca urmare a publicitatii noastre.</p>
                <p>In timpul vizionarii site-ului nostru, vom putea stoca anumite informatii pe computerul dumneavoastra. Aceasta informatie va fi sub forma unui “Cookie” sau a unui fisier similar, care ne va fi de real folos. De exemplu, fisierele “Cookies” ne ajuta sa construim un website sau publicitate care sa raspunda cat mai bine intereselor si preferintelor dumneavoastra. Cu cele mai multe browsere de internet puteti sterge sau bloca fisierele “Cookies”, sau puteti primi o atentionare inaintea primirii unui astfel de fisier. Va rugam sa consultati instructiunile browser-ului dumneavoastra, sau fiserul de Help pentru a afla mai multe informatii despre aceste functii.</p>
                <p>5. <strong>Legi si Jurisdictii</strong><br />
                  Acest site a fost creat si functioneaza in concordanta cu legile in vigoare in Romania. Pentru reglarea oricaror dispute referitoare la acest site, legile si tribunalele din Romania vor avea jurisdictie exclusiva.</p>
              </div>
            </div>
          </Modal.Body>
        </Modal>

      </footer>
    );
  }
}

// function ProfileDropdownMenu(props) {
//   const dropdownMenu = (
//     <Menu onClick={props.handleMenuClick} className="profile-dropdown-menu">
//       <Menu.Item key="user-info" className="dropdown-item" disabled>
//         <div className="user-full-name-info">{props.currentUser.name}</div>
//         <div className="username-info">@{props.currentUser.username}</div>
//       </Menu.Item>
//       <Menu.Divider />
//       <Menu.Item key="profile" className="dropdown-item">
//         <Link to={`/users/${props.currentUser.username}`}>Profile</Link>
//       </Menu.Item>
//       <Menu.Item key="logout" className="dropdown-item">
//         <Link to="/home">Logout</Link>
//       </Menu.Item>
//     </Menu>
//   );

//   return (
//     <Dropdown
//       overlay={dropdownMenu}
//       trigger={["click"]}
//       getPopupContainer={() =>
//         document.getElementsByClassName("profile-menu")[0]
//       }
//     >
//       <a className="ant-dropdown-link">
//         <Icon type="user" className="nav-icon" style={{ marginRight: 0 }} />{" "}
//         <Icon type="down" />
//       </a>
//     </Dropdown>
//   );
// }

export default withRouter(AppFooter);
