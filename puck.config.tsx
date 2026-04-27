import type { Config } from "@puckeditor/core";

type Props = {
  HeadingBlock: { title: string };
  Text: {
    title: string;
    text: string;
    size: number;
    align: "text-left" | "text-center" | "text-right";
    boldWeight: number;
    color: string;
    width: string;
    href: string;
  };
};

export const config: Config<Props> = {
  components: {
    Text: {
      inline: true,
      resolveFields: () => {
        const textField = {
          title: {
            type: "text",
          },
          size: {
            type: "number",
          },
          align: {
            type: "radio",
            options: [
              { label: "left", value: "text-left" },
              { label: "center", value: "text-center" },
              { label: "right", value: "text-right" },
            ],
          },
          boldWeight: {
            type: "number",
          },
          color: {
            type: "text",
          },
          width: {
            type: "text",
          },
          href: {
            type: "text",
          },
        } as const;

        return textField;
      },
      metadata: {
        Icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="4 7 4 4 20 4 20 7"></polyline>
            <line x1="9" x2="15" y1="20" y2="20"></line>
            <line x1="12" x2="12" y1="4" y2="20"></line>
          </svg>
        ),
      },
      render: ({ puck, ...rest }) => {
        const { title, align, size, boldWeight, color, width, href } = rest;
        return (
          <p
            ref={puck.dragRef}
            style={{
              fontSize: `${size}px`,
              fontWeight: boldWeight,
              color: "white",
              width: width,
            }}
            className={align ?? "text-left"}
          >
            {href ? (
              <a href={href} style={{ color: "white !important" }}>
                {title}
              </a>
            ) : (
              title
            )}
          </p>
        );
      },
    },

    Image: {
      resolveFields: () => {
        const flexField = {
          imgSrc: {
            type: "text",
          },
          width: { type: "text" },
          height: { type: "text" },
        } as const;

        return flexField;
      },

      defaultProps: {
        imgSrc:
          "https://cdn-icons-png.freepik.com/256/11680/11680860.png?semt=ais_white_label",
      },

      render: ({ content: Content, ...rest }) => {
        const { imgSrc, width, height } = rest;
        return (
          <img
            style={{
              width: width,
              height: height,
            }}
            src={imgSrc}
            alt={imgSrc}
          />
        );
      },
    },

    HS_base: {
      fields: {
        imgSrc: {
          type: "text",
        },
        left: {
          type: "text",
        },
        top: {
          type: "text",
        },
        right: {
          type: "text",
        },
        bottom: {
          type: "text",
        },
        width: {
          type: "text",
        },
        height: {
          type: "text",
        },
        content: {
          type: "slot",
        },
      },

      defaultProps: {
        imgSrc:
          "https://www.nobelrecruitment.com/wp-content/uploads/2025/03/Nobel-Team-compressed-scaled.jpg",
      },

      render: ({
        width,
        height,
        left,
        top,
        right,
        bottom,
        imgSrc,
        content: Content,
        ...rest
      }) => {
        return (
          <section
            style={{
              padding: 64,
              backgroundImage: `
              linear-gradient(
                to bottom,
                rgba(0,0,0,0.75) 0%,
                rgba(0,0,0,0.45) 45%,
                rgba(0,0,0,0.75) 100%
              ),
              url("${imgSrc}")
            `,
            }}
            className="text-[var(--primary-color)] relative w-full  h-[71vh] max-h-[700px]  bg-no-repeat bg-[position:50%_50%] bg-cover "
          >
            <Content
              style={{
                display: "absolute",
                zIndex: 2,
                width: width,
                height: height,
              }}
              className=""
            />
          </section>
        );
      },
    },
  },
};

export default config;
