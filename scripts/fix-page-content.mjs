import fs from "fs";

const file = "src/PageContent.jsx";
let content = fs.readFileSync(file, "utf8");

const openDiv = "<" + "div" + ' className="nav-bar__cta">';
const closeDiv = "</" + "div" + ">";

const navReplacement = `${openDiv}
              <a
                href="/register"
                className="yellow-button w-button nav-cta-button"
                onClick={(event) => {
                  event.preventDefault();
                  onNavigate("/register");
                }}
              >
                Claim Your Spot
              </a>
              <MobileNav
                isOpen={mobileNavOpen}
                onToggle={toggleMobileNav}
                onClose={closeMobileNav}
                links={NAV_LINKS}
                onNavigate={onNavigate}
              />
            ${closeDiv}`;

const navPattern = new RegExp(
  "<motionDiv className=\"nav-bar__cta\">[\\s\\S]*?</" + "div" + ">"
);
content = content.replace(navPattern, navReplacement);

content = content.replace(/<style>\{\`[\s\S]*?\`\}<\/style>\n?/, "");
content = content.replace('import { TiltCard } from "./components/TiltCard";\n', "");

fs.writeFileSync(file, content);
console.log("Updated PageContent.jsx");
