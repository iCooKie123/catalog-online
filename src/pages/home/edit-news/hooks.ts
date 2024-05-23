import axios from "@/axios";
import { useSnackBar } from "@/contexts";
import { News, NewsForm } from "@/models";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const titleIsRequired = "Titlul este obligatoriu";
const contentIsRequired = "Conținutul este obligatoriu";
const errorFetchingData = "Eroare la preluarea datelor";
const successChangesSaved = "Modificări salvate cu success!";
const errorChangesSaved = "Eroare la salvarea modificărilor";
const noChanges = "Nu s-au făcut modificări";

export const useEditNews = () => {
    const [news, setNews] = useState<News[]>([]);
    const { showSnackBar } = useSnackBar();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        getClasses();
    }, []);

    useEffect(() => {
        reset(getDefaultValues());
        console.log("reset");
    }, [news]);

    const getClasses = useCallback(async () => {
        setIsLoading(true);
        await axios
            .get("news")
            .then((res: AxiosResponse) => {
                const responseArray: any[] = res.data;

                const newsArray: News[] = responseArray.map((n: any) => {
                    return {
                        id: n.id,
                        title: n.title,
                        content: n.content,
                        createdAt: new Date(n.createdAt),
                        modifiedAt: new Date(n.modifiedAt),
                    } satisfies News;
                });

                setNews(
                    newsArray.sort(
                        (a: News, b: News) =>
                            b.createdAt.getTime() - a.createdAt.getTime()
                    )
                );
            })
            .catch(() => {
                showSnackBar(errorFetchingData, "error");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [showSnackBar]);

    const getDefaultValues = (): NewsForm => {
        const values: NewsForm = {
            news: news.map((n) => ({
                id: n.id,
                title: n.title,
                content: n.content,
                createdAt: n.createdAt,
            })),
        };
        return values;
    };

    const newsSchema = yup.object().shape({
        id: yup.number().required(),
        title: yup.string().required(titleIsRequired),
        content: yup.string().required(contentIsRequired),
        createdAt: yup.date(),
    });

    const validationSchema = yup.object().shape({
        news: yup.array().of(newsSchema).required(),
    });

    const methods = useForm<NewsForm>({
        resolver: yupResolver(validationSchema),
        mode: "onBlur",
        defaultValues: getDefaultValues(),
    });
    const {
        watch,
        setValue,
        formState: { errors },
        reset,
        trigger,
        handleSubmit,
    } = methods;

    useEffect(() => {
        methods.reset(getDefaultValues());
    }, [news]);

    const getDirtyFields = () => {
        const dirtyFields = methods.formState.dirtyFields.news;
        const formValues = methods.getValues() as NewsForm;
        const dirtyObjects = [];

        for (const key in dirtyFields) {
            const keyNumber = parseInt(key);
            if (dirtyFields[keyNumber]) {
                dirtyObjects.push({
                    id: formValues.news[keyNumber].id,
                    content: formValues.news[keyNumber].content,
                    title: formValues.news[keyNumber].title,
                });
            }
        }
        return dirtyObjects;
    };

    const saveChanges = () => {
        const dirtyFields = getDirtyFields();
        if (dirtyFields.length === 0) {
            showSnackBar(noChanges, "info");
            return;
        }

        setIsLoading(true);

        axios
            .patch("news/edit", { news: dirtyFields })
            .then(() => {
                showSnackBar(successChangesSaved, "success");
            })
            .catch(() => {
                showSnackBar(errorChangesSaved, "error");
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return {
        isLoading,
        saveChanges,
        values: watch("news"),
        errors,
        setValue,
        watch,
        methods,
        trigger,
        modalIsOpen,
        setModalIsOpen,
        getClasses,
        handleSubmit,
    };
};
