type Props = {
  title: string;
  description: string;
  date: string;
  tags: string;
  slug: string;
};

const SinglePost = (props: Props) => {
  const { title, description, date, tags, slug } = props;
  return (
    <div>
      <h1></h1>
    </div>
  );
};

export default SinglePost;
