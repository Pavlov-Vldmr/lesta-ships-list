

const styles = {
  global: {
    "html, body": {
      color: "#fff",
      backgroundColor: "gray.900",
    },
    svg: {
      cursor: "pointer",
    },
    ".header": {
      bg: "#333",
      h: "3.75rem",
      w: "100%",
      position: 'fixed',
      zIndex: '999',

      ".logo": {
        w: "230px",
        h: "44px"
      },
      ".nav-link": {
        display: "flex",
        alignItems: "center",
        h: "inherit",
        marginLeft: "28px",
        color: "#fff",
        fontFamily: "Roboto",
        fontSize: "16px",
        letterSpacing: "0.32px",
        textTransform: "uppercase",
        borderBottom: "3px solid #0cc0",

        "_hover": {
          borderBottom: "3px solid  #025555",
        }
      },
      ".active": {
        borderBottom: "3px solid #0cc",
        transition: "all .3s ease-out",
        "_hover": {
          borderBottom: "3px solid #0cc",
        }
      },

    },
    ".homePage-container": {
      position: 'relative',
      zIndex: '10',
      w: '100%',
      h: '100vh',


      ".nav-item": {
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        w: "390px",
        h: "204px",
        boxShadow: "0 1px 12px rgba(0,0,0,.25)",
        cursor: 'pointer',

        "_after": {
          display: 'flex',
          alignItems: "center",
          justifyContent: "center",
          h: "52px",
          w: "100%",
          backgroundColor: "rgba(25,58,72,.8)",
          position: "absolute",
          bottom: "0",
          textTransform: "uppercase",
          color: "#fff",
          fontFamily: "Roboto",
          fontWeight: "bold",
          fontSize: "16px",
          transition: "all .5s ease-in-out",
          cursor: "pointer",

          

        },

        "_hover": {
          "_after":{
            h: "inherit"

          }
        }

      },
      ".ships": {
        "_after": {
          content: '"Корабли"'
        },
      },
      ".contacts": {
        "_after": {
          content: '"Контакты"'
        }
      }
    }
  },
};

export default styles;
