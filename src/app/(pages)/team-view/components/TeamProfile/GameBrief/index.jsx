'use client'

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { TOUR } from 'app/utils/tour.util'
import Image from 'next/image'
import { toast } from 'react-toastify'

const GameBrief = () => {
  const [nextTour, setNextTour] = useState(null)

  const { tours, currentTourIndex, currentTour, isLoading } = useSelector(
    (store) => store.tours
  )
  const { currentTeam } = useSelector((store) => store.currentTeam)
  const { currentCompetition } = useSelector((store) => store.competition)
  const { teamPrice, teamBalance, currentTourTeam } = useSelector(
    (store) => store.tourTeams
  )
  const { t } = useTranslation()

  useEffect(() => {
    if (tours.length > 0) {
      const nextTour = tours[currentTourIndex + 1]
      setNextTour(nextTour)
    }
  }, [tours, currentTourIndex])

  const date = new Date(nextTour?.datetime_start)
  const day = date.getDate()
  const month = date.getUTCMonth() + 1
  const year = date.getFullYear()
  const hours = date.getHours()
  const minutes = date.getMinutes()

  const curDate = new Date(currentTour?.datetime_start)

  const handleClick = (value) => {
    navigator.clipboard.writeText(value)
    toast.info('Successfully copied to clipboard!', { theme: 'dark' })
  }

  return (
    <section className="fade-in-fast mx-auto flex h-min min-h-96 w-full max-w-[32rem] flex-col justify-between gap-4 rounded-2xl border border-primary border-opacity-50 bg-neutral-950 px-4 py-6 transition-all hover:border-opacity-100 2xs:px-6 md:max-w-[40rem] md:gap-4 md:px-8 lg:mx-0 lg:w-1/2 2xl:h-full">
      {isLoading ? (
        <div className="flex h-full w-full items-center justify-center">
          <div className="loader" />
        </div>
      ) : (
        <>
          <Container className="border-b border-neutral-700">
            <Item>
              <Title className="">{t('ID')}</Title>
              <Content
                className={
                  'flex cursor-pointer items-center justify-center gap-0.5 hover:underline'
                }
                onClick={() => handleClick(currentTeam?.id)}
              >
                <Image
                  width="20"
                  height="20"
                  className="filter-white size-5"
                  src="/icons/copy.svg"
                  alt="copy"
                />
                {currentTeam?.id}
              </Content>
            </Item>
            <Item>
              <Title>{t('Nomi')}</Title>
              <Content>{currentTeam?.name}</Content>
            </Item>
          </Container>
          <Container className="border-b border-neutral-700">
            <Item>
              <Title> {t('Keyingi Tur')}</Title>
              <Content className="text-sm uppercase text-primary md:text-base">
                {nextTour?.name}
              </Content>
            </Item>
            <Item>
              <Title>{t('Deadline')}</Title>
              {currentTour.status !== TOUR.notStartedTransfer ? (
                <Content>
                  {`${day}/${month}/${year}`} |{' '}
                  {`${hours}:${minutes === 0 ? '00' : minutes < 10 ? '0' + minutes : minutes}`}
                </Content>
              ) : (
                <Content>
                  {`${curDate.getDate()}/${curDate.getUTCMonth() + 1}/${curDate.getFullYear()}`}{' '}
                  |{' '}
                  {`${curDate.getHours()}:${curDate.getMinutes() === 0 ? '00' : curDate.getMinutes()}`}
                </Content>
              )}
            </Item>
          </Container>
          <Container className="border-b border-neutral-700">
            <Item>
              <Title>{t('Tur')}</Title>
              <Content>{currentTour?.name ?? t('Hozirgi Tur')}</Content>
            </Item>
            <Item>
              <Title>{t('Turdagi ochkolar')}</Title>
              <Content>{currentTourTeam?.point ?? '0'}</Content>
            </Item>
          </Container>
          <Container className="border-b border-neutral-700">
            <Item>
              <Title>{t('Turnirdagi ochkolar')}</Title>
              <Content>{currentTeam?.point ?? '0'}</Content>
            </Item>
            <Item>
              <Title>{t("Turnirdagi o'rtacha ochkolar")}</Title>
              <Content>{currentCompetition?.average_team_point ?? '0'}</Content>
            </Item>
          </Container>
          <Container className="border-b border-neutral-700">
            <Item>
              <Title>{t('Chempionat')}</Title>
              <Content>{currentTeam?.competition_id?.title}</Content>
            </Item>
            <Item>
              <Title className="text-neutral-100">{t("Ligadagi o'rin")}</Title>
              <Content className="space-x-1">
                {currentTeam?.order ?? '0'} /{' '}
                {currentCompetition?.team_count ?? '0'}
              </Content>
            </Item>
          </Container>
          <Container>
            <Item>
              <Title>{t('Jamoa narxi')}</Title>
              <Content>{teamPrice ?? 0}</Content>
            </Item>
            <Item>
              <Title>{t('Balans')}</Title>
              <Content>{teamBalance ?? 100}</Content>
            </Item>
          </Container>
        </>
      )}
    </section>
  )
}

const Container = ({ children, className }) => {
  return (
    <div className={`flex flex-col gap-2 pb-2 ${className}`}>{children}</div>
  )
}

const Item = ({ children, className }) => {
  return (
    <div className={`flex justify-between gap-1 ${className}`}>{children}</div>
  )
}

const Title = ({ children, className }) => {
  return (
    <h3 className={`text-base text-neutral-100 md:text-lg ${className}`}>
      {children}
    </h3>
  )
}

const Content = ({ children, className, onClick }) => {
  return (
    <p
      onClick={onClick}
      className={`text-end text-sm uppercase text-primary md:text-base ${className}`}
    >
      {children}
    </p>
  )
}

export default GameBrief
