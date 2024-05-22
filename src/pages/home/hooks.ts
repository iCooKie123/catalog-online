import axios from "@/axios";
import { AuthContext } from "@/contexts";
import { UserRoles, News } from "@/models";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect, useState } from "react";
import { Resolver, useForm } from "react-hook-form";
import * as yup from "yup";

export const useHomePage = () => {
    const { currentUser } = useContext(AuthContext);
    const userIsAdmin = currentUser?.role === UserRoles.Admin;
    const [news, setNews] = useState<News[]>([]);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        await axios
            .get<News[]>("news")
            .then((response) => {
                setNews(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const getDefaultValues = () => {
        return {
            news: news.map((n) => ({
                id: n.id,
                title: n.title,
                content: n.content,
            })),
        } satisfies NewsForm;
    };

    const validationSchema = yup.object().shape({
        news: yup
            .array()
            .of(
                yup.object().shape({
                    id: yup.number().required(),
                    title: yup.string().required("Title is required"),
                    content: yup.string().required("Content is required"),
                })
            )
            .required(),
    });

    interface NewsForm {
        news: { id: number; title: string; content: string }[];
    }

    const defaultValues = getDefaultValues();

    const methods = useForm<NewsForm>({
        resolver: yupResolver(validationSchema),
        mode: "onBlur",
        defaultValues: defaultValues,
    });

    return {
        methods,
    };
};
