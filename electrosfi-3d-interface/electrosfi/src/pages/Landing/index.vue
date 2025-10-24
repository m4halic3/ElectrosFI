<template>
  <div id="landing">
    <!-- <AppBarLanding /> -->
    <div class="">
      <v-row
        align="center"
        class="header"
        justify="center"
        justify-md="start"
      >
        <img
          v-prlx
          class="img-background-header"
          src="/img/images/background-header-1.jpg"
          alt=""
        >
        <v-col
          offset-md="2"
          cols="11"
          md="4"
          class="text-left"
        >
          <h1 class="text-h2 text-md-h1">
            ElectrosFI
          </h1>
          <typical
            class="text-md-h4 text-h5 mt-3 mb-3"
            :steps="[
              'A new way to simulate',
              1000,
              'A new way to create new devices',
              100,
              'A new way to view numeric results',
              100,
              'Simulate in Anyplace, Anywhere and Anytime',
              100,
              'Electromagnetic Simulator of the \n Federal Institute',
              2000,
            ]"
            :wrapper="'h2'"
            :loop="Infinity"
          />
          <v-row>
            <v-col
              cols="12"
              md="6"
            >
              <v-btn
                block
                link
                class=""
                text
                to="/login"
                x-large
                outlined
              >
                Sign In
              </v-btn>
            </v-col>
            <v-col
              cols="12"
              md="6"
            >
              <v-btn
                block
                link
                class=""
                color="primary"
                to="/register"
                x-large
              >
                Sign Up
              </v-btn>
            </v-col>
          </v-row>

          <p class="text-caption mt-4 ml-3 ml-md-0">
            Made with love and care by
            <a
              href="https://github.com/paulhenrique"
              target="_blank"
            >@paulhenrique</a>
            <br>
            at
            <a
              target="_blank"
              href="https://itp.ifsp.edu.br/"
            >IFSP Campus Itapetininga</a>
          </p>
        </v-col>
      </v-row>
      <v-row
        justify="center"
        class="mt-11 container-info"
        align="center"
      >
        <v-col cols="9">
          <v-row
            justify="center"
            class="text-center"
            align="center"
          >
            <v-col
              cols="12"
              md="8"
            >
              <h2 class="text-h4 mb-12">
                Build and view new photonic devices with a fast and simple
                interface 2D.
              </h2>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              md="4"
              class="text-center"
            >
              <div class="icon-container">
                <v-icon x-large>
                  mdi-angle-obtuse
                </v-icon>
              </div>
              <p>
                Draw your device with the geometric canvas 2D just with a email
                login and email or a Google account.
              </p>
            </v-col>
            <v-col
              cols="12"
              md="4"
              class="text-center"
            >
              <div class="icon-container">
                <v-icon x-large>
                  mdi-folder-edit-outline
                </v-icon>
              </div>
              <p>
                Save and edit your simulations of anywhere and anytime just with
                a internet connection.
              </p>
            </v-col>
            <v-col
              cols="12"
              md="4"
              class="text-center"
            >
              <div class="icon-container">
                <v-icon x-large>
                  mdi-chart-box-outline
                </v-icon>
              </div>
              <p>
                Run and visualize your simulations with personalized pictures,
                charts and video outputs.
              </p>
            </v-col>
          </v-row>
          <v-row
            justify="center"
            class="mt-4 text-center mb-11"
            align="center"
          >
            <v-col
              cols="12"
              md="6"
            >
              <h2 class="text-h5 mt-3">
                Sign up and discover this world
              </h2>
              <v-btn
                link
                block
                class="ma-2 mt-5"
                color="primary"
                to="/register"
                x-large
              >
                Sign Up right now
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
    <v-row
      justify="center"
      align="center"
      class="content-team py-11"
    >
      <v-col cols="9">
        <h2 class="text-h4 text-center mt-3">
          The team
        </h2>
        <v-col
          cols="12"
          md="6"
          class="ma-auto"
        >
          <p class="text-center">
            The development team is small, this project was developed in a
            Fapesp research project in 2020
          </p>
        </v-col>
        <v-row
          justify="space-around"
          class="mt-12 content-team-person"
        >
          <v-col
            cols="12"
            md="3"
            class="text-center"
          >
            <div>
              <img
                v-prlx="{ reverse: true }"
                src="/img/team/paulo.gif"
                alt="Paulo Henrique"
                width="150"
              >
            </div>
            <h2 class="text-h6">
              Paulo Henrique
            </h2>
            <p class="text-caption">
              Physics Student at IFSP Campus Itapetininga, developer and
              designer of ElectrosFI interface and numeric part.
              <br>
              <a
                href="http://lattes.cnpq.br/1994196517067630"
                target="_blank"
              >
                Read More
              </a>
            </p>
          </v-col>
          <v-col
            cols="12"
            md="3"
            class="text-center"
          >
            <div>
              <img
                v-prlx="{ reverse: true }"
                src="/img/team/carlos.gif"
                alt="Carlos Santos"
                width="150"
              >
            </div>
            <h2 class="text-h6">
              Dr. Carlos Santos
            </h2>
            <p class="text-caption">
              Computer Professor at IFSP Campus Itapetininga, orienter and
              mentor of this project. He is the Researcher Responsible. <br>
              <a
                href="http://lattes.cnpq.br/2704773293662530"
                target="_blank"
              >
                Read More
              </a>
            </p>
          </v-col>
        </v-row>
      </v-col>
      <v-row class="mt-12">
        <v-col>
          <v-col
            md="6"
            cols="11"
            class="ma-auto"
          >
            <h2 class="text-h4 text-center mt-3 mb-3">
              Realization and Financing
            </h2>
            <p class="text-center">
              This project is being carried out at the Federal Institute of
              Education, Science and Technology of São Paulo - Campus
              Itapetininga, with a financing of São Paulo Research Foundation by
              the project 2019/20330-1.
            </p>
          </v-col>
          <v-row
            justify="center"
            class="mt-5"
          >
            <v-col
              cols="5"
              md="2"
            >
              <v-img
                src="/img/logo_ifsp.jpg"
                alt="Logo do IFSP Campus Itapetininga"
              />
            </v-col>
            <v-col
              cols="5"
              md="2"
            >
              <v-img
                src="/img/logo_fapesp.jpeg"
                alt="Logo da Fapesp"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-row>
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.293147190238!2d-48.02073778502155!3d-23.593817384666814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c5cbf41ebfcf31%3A0xa65e4fb6d75446bf!2sInstituto%20Federal%20de%20Educa%C3%A7%C3%A3o%2C%20Ci%C3%AAncia%20e%20Tecnologia%20de%20S%C3%A3o%20Paulo%2C%20Campus%20Itapetininga!5e0!3m2!1spt-BR!2sbr!4v1608065771040!5m2!1spt-BR!2sbr"
      width="100%"
      height="300"
      frameborder="0"
      style="border: 0"
      allowfullscreen=""
      aria-hidden="false"
      tabindex="0"
    />
    <v-row
      class="footer py-5"
      justify="center"
      align="center"
    >
      <img
        v-prlx
        class="img-background-footer"
        src="/img/images/background-header-1.jpg"
        alt=""
      >
      <v-col
        class="content-text text-center"
        md="4"
        cols="12"
      >
        <h2 class="text-h4 mt-3">
          ElectrosFI
        </h2>
        <p class="text-caption">
          Email:
          <a
            class="text-caption"
            href="mailto:electrosfi@gmail.com"
          >
            electrosfi@gmail.com
          </a>
          <br>
          Av. João Olímpio de Oliveira, 1561 - Vila Asem,<br>
          Itapetininga - SP, 18202-000
        </p>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import typical from "vue-typical";
export default {
  name: "Landing",
  components: {
    typical,
    // AppBarLanding: () => import("@/components/AppBarLanding"),
  },
  mounted(){
    this.$vuetify.theme.dark = true;
  }
};
</script>
<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap");
*,
.text-h1,
.text-h2,
.text-h3,
.text-h4,
button,
a,
.text-caption {
  font-family: "Noto Sans JP", sans-serif !important;
}
#landing {
  background: #2b2521 !important;
  max-width: 100vw;
  overflow: hidden;
}
.content-team {
  background: white !important;
  color: #6d6d6d;
  .content-team-person img {
    border-radius: 50%;
    border-radius: 50%;
    filter: brightness(1.3) contrast(0.7);
  }
}
.header {
  min-height: 100vh;
  background-size: cover;
  background-position: center center;
  position: relative;
  overflow: hidden;
  color:white;
  .img-background-header {
    position: absolute;
    left: 0;
    width: 130%;
    @media screen and (max-width: 450px) {
      width: unset;
      height: 150%;
    }
  }
  div {
    z-index: 3;
  }
  .text-caption {
    color: #949494;
  }
  &:after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(-90deg, #0000001c, #000000c7);
  }
}
.icon-container {
  background: orange;
  margin: auto;
  height: 80px;
  width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotate(45deg);
  margin-bottom: 3rem;
  transition: 0.1s ease-in-out;

  box-shadow: 13px 12px 16px 0px #000000a3;
  i {
    transform: rotate(-45deg);
  }
  position: relative;
  &:hover {
    box-shadow: 13px 0px 16px 0px #000000a3;
    &:before {
      transform: translateX(0);
    }
  }
  &:before {
    position: absolute;
    width: 100%;
    height: 100%;
    content: "";
    background: #3eb772;
    top: 0;
    left: 0;
    z-index: 0;
    transition: 0.1s ease-in-out;
    transform: translateX(10px);
  }
}
.container-info p {
  color: #9e9e9e;
}
.footer {
  position: relative;
  overflow: hidden;
  background: black;
  .content-text {
    z-index: 2;
  }
  .img-background-footer {
    position: absolute;
    width: 100%;
    margin: auto;
    opacity: 0.2;
    left: 0;
    top: -290px;
    @media screen and (max-width: 450px) {
      top: 0 !important;
    }
  }
}
</style>