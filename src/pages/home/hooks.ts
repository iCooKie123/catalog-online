import { News, NewsForm } from "@/models";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

export const useHomePage = (news: News[]) => {
    const getDefaultValues = (): NewsForm => {
        const values: NewsForm = {
            news: news.map((n) => ({
                id: n.id,
                title: n.title,
                content: n.content,
            })),
        };
        return values;
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

    const methods = useForm<NewsForm>({
        resolver: yupResolver(validationSchema),
        mode: "onBlur",
        defaultValues: getDefaultValues(),
    });

    useEffect(() => {
        methods.reset(getDefaultValues());
    }, [news]);

    return {
        methods,
    };
};
