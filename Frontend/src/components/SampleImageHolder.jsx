import Zero from "../assets/0.png";
import One from "../assets/1.png";
import Two from "../assets/2.png";
import Three from "../assets/3.png";
import Four from "../assets/4.png";
import Five from "../assets/5.png";
import Six from "../assets/6.png";
import Seven from "../assets/7.png";
import Eight from "../assets/8.png";
import Nine from "../assets/9.png";
import plus from "../assets/+.png";
import minus from "../assets/-.png";
import multiply from "../assets/x.png";
import divide from "../assets/Div.png";
import OpenBracket from "../assets/[.png";
import CloseBracket from "../assets/].png";
import dot from "../assets/dot.png";
import equal from "../assets/=.png";
export default function ImageGallery({ref,}) {
    const images = [
        Zero,
        One,
        Two,
        Three,
        Four,
        Five,
        Six,
        Seven,
        Eight,
        Nine,
        plus,
        minus,
        multiply,
        divide,
        dot,
        OpenBracket,
        CloseBracket,
        equal,
    ];
  
    return (
      <div ref={ref} className="p-20">
        <h1 className="text-2xl md:text-9xl font-semibold text-center mb-4">Image Samples</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-10">
          {images.map((src, index) => (
            <div key={index} className="overflow-hidden rounded-lg shadow-lg">
              <img
                src={src}
                alt={`Gallery ${index}`}
                className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
  