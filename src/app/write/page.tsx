'use client'

import { useState } from "react"
import styles from "./writepage.module.css"
import Image from "next/image"
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.bubble.css'
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

const WritePage = () => {

    const [open, setOpen] = useState(false);
    const [file, setFile] = useState(null);
    const [media, setMedia] = useState("");
    const [value, setValue] = useState("");
    const [title, setTitle] = useState("");
    const [catSlug, setCatSlug] = useState("");

    const { status } = useSession()
    const router = useRouter()


    // transform Beti Haile => beti-haile
    const slugify = (str: string) =>
        str
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/[\s_-]+/g, "-")
            .replace(/^-+|-+$/g, "");


    const handleSubmit = async () => {
        const res = await fetch("/api/posts", {
            method: "POST",
            body: JSON.stringify({
                title,
                desc: value,
                img: media,
                slug: slugify(title),
                catSlug: catSlug || "style", 
            })
        })
        console.log(res)
    }

    return (
        <div className={styles.container}>
            <input type="text" placeholder="Title" className={styles.input} onChange={e => setTitle(e.target.value)} />
            <select className={styles.select} onChange={(e) => setCatSlug(e.target.value)}>
                <option value="style">style</option>
                <option value="fashion">fashion</option>
                <option value="food">food</option>
                <option value="culture">culture</option>
                <option value="travel">travel</option>
                <option value="coding">coding</option>
            </select>
            <div className={styles.editor}>
                <button className={styles.button} onClick={() => setOpen(!open)}>
                    <Image src='/plus.png' alt="" width={16} height={16} />
                </button>
                {open && <div className={styles.add}>
                    <input type="file" id="image" onChange={(e) => setFile(e.target.files[0])} style={{ display: 'none' }} />
                    <button className={styles.addButton}>
                        <label htmlFor="image">
                            <Image src="/image.png" alt="" width={16} height={16} />
                        </label>
                    </button>
                    <button className={styles.addButton}>
                        <Image src='/video.png' alt="" width={16} height={16} />
                    </button>
                    <button className={styles.addButton}>
                        <Image src='/video.png' alt="" width={16} height={16} />
                    </button>
                </div>}
                <ReactQuill className={styles.textArea} theme="bubble" value={value} onChange={setValue} placeholder="Tell Your story..." />
            </div>
            <button className={styles.publish} onClick={handleSubmit} >publish</button>
        </div>
    )
}

export default WritePage
