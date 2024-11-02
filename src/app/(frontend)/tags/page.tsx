import Link from 'next/link';
import Prose from '@/components/Prose';
import { getPayload } from '@/payload/client';
import getCollectionUrlPath from '@/utils/getCollectionUrlPath';

const Page = async () => {
  const client = await getPayload();
  const { docs } = await client.find({
    collection: 'tags',
    sort: 'title',
    limit: -1,
  });

  if (docs.length === 0) {
    return <Prose>No tags</Prose>;
  }

  return (
    <>
      <Prose className="prose-ul:ps-0 prose-li:ps-0 prose-li:m-0">
        <ul className="flex gap-2 list-none">
          {docs.map((post) => (
            <li key={post.id}>
              <Link href={getCollectionUrlPath('tags', post.routing.path)}>
                #{post.title}
              </Link>
            </li>
          ))}
        </ul>
      </Prose>
    </>
  );
};

export default Page;
