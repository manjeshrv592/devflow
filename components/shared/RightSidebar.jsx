import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import RenderTag from './RenderTag';

const hotQuestions = [
  { _id: 1, title: 'How do I use express as a custom server in NextJS?' },
  { _id: 2, title: 'Cascading Deletes in SQLAlchemy?' },
  { _id: 3, title: 'How to perfectly center div with Tailwind Css?' },
  {
    _id: 4,
    title:
      'Best practices for data fetching in a Next.js application with server side rendering (SSR)?',
  },
  { _id: 5, title: 'Redux Toolkit not updating state as expected' },
];

const popularTags = [
  { _id: 1, name: 'Javascript', numberOfQuestions: 5 },
  { _id: 2, name: 'React', numberOfQuestions: 2 },
  { _id: 3, name: 'Next', numberOfQuestions: 10 },
  { _id: 4, name: 'Vue', numberOfQuestions: 7 },
  { _id: 5, name: 'Redux', numberOfQuestions: 3 },
];

const RightSidebar = () => {
  return (
    <section className='background-light900_dark200 light-border custom-scrollbar sticky right-0 top-0 flex h-screen w-[350px] flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden'>
      <div>
        <h3 className='h3-bold text-dark200_light900'>Top Questions</h3>
        <div className='mt-7 flex w-full flex-col gap-[30px]'>
          {hotQuestions.map(question => (
            <Link
              href={`/question/${question._id}`}
              key={question._id}
              className='flex cursor-pointer items-center justify-between gap-7'>
              <p className='body-medium text-dark500_light700'>
                {question.title}
              </p>
              <Image
                src='/assets/icons/chevron-right.svg'
                alt='chevron right'
                width={20}
                height={20}
                className='invert-colors'
              />
            </Link>
          ))}
        </div>
      </div>
      <div className='mt-16'>
        <h3 className='h3-bold text-dark200_light900'>Popular Tags</h3>
        <div className='mt-7 flex flex-col gap-4'>
          {popularTags.map(tag => (
            <RenderTag
              key={tag._id}
              _id={tag._id}
              name={tag.name}
              totalQuestions={tag.numberOfQuestions}
              showCount
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
