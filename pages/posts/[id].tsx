import React from 'react'
import Head from 'next/head'
import {NextPage} from 'next'
import Date from '@/components/date'
import Layout from '@/components/layout'
import utilStyles from '../../styles/utils.module.css'
import { getAllPostIds, getPostData } from '@/lib/posts'

const Post: NextPage = ({ postData }: any) => {
  return (
    <Layout>
        <Head>
            <title>{postData.title}</title>
        </Head>
        <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
            <Date dateString={postData.date}></Date>
        </div>
        <div dangerouslySetInnerHTML={{__html: postData.contentHtml}} />
        </article>
    </Layout>
  )
}

export const getStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  } 
}

export const getStaticProps = async ({ params }: any) => {
    const postData = await getPostData(params.id)
    return {
        props: {
            postData,
        }
    }
}

export default Post