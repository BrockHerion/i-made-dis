type Props = {
  content?: string;
};

export default function ProjectDescription({ content }: Props) {
  return <p>{content}</p>;
}
